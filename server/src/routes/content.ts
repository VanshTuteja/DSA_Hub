import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { upload } from '../middleware/upload';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { ContentParserService } from '../services/contentParser';
import { QuizGeneratorService } from '../services/quizGenerator';
import { OllamaService } from '../services/ollamaService';
import { uploadValidation, validateFileUpload } from '../utils/validation';
import { Quiz } from '../models/Quiz';
import { config } from '../config/index';
import { logger } from '../utils/logger';
import { Content } from '../models/Content';
import fs from 'fs/promises';

const router = express.Router();
const contentParser = new ContentParserService();
const quizGenerator = new QuizGeneratorService();
const ollamaService = new OllamaService();

/**
 * Health check for Ollama service
 */
router.get('/health/ollama', async (req, res) => {
  try {
    const isHealthy = await ollamaService.checkHealth();
    res.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      service: 'ollama',
      model: config.ollama.model,
      baseUrl: config.ollama.baseUrl
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      service: 'ollama',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Upload PDF file
 */
router.post('/upload/pdf', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    validateFileUpload(req.file, config.upload.allowedPdfTypes);

    const content = new Content({
      userId: req.user!._id,
      type: 'pdf',
      title: req.body.title || req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.path,
      uploadDate: new Date().toISOString(),
      status: 'processing',
      metadata: {
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      }
    });

    await content.save();

    // Process content asynchronously
    await processContentAsync(content);
    await fs.unlink(req.file.path);
    res.json({
      success: true,
      contentId: content._id,
      message: 'PDF uploaded successfully. Processing started.'
    });

  } catch (error) {
    logger.error(`PDF upload failed: ${error}`);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed'
    });
  }
});

/**
 * Upload image file
 */
router.post('/upload/image', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    validateFileUpload(req.file, config.upload.allowedImageTypes);

    const content = new Content({
      userId: req.user!._id,
      type: 'image',
      title: req.body.title || req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.path,
      status: 'processing',
      metadata: {
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      }
    });

    await content.save();

    // Process content asynchronously
    await processContentAsync(content);
    await fs.unlink(req.file.path);
    res.json({
      success: true,
      contentId: content._id,
      message: 'Image uploaded successfully. Processing started.'
    });

  } catch (error) {
    logger.error(`Image upload failed: ${error}`);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Upload failed'
    });
  }
});

/**
 * Upload video file
 */
router.post('/upload/video', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // validateFileUpload(req.file, config.upload.allowedVideoTypes);

    const content = new Content({
      userId: req.user!._id,
      type: 'video',
      title: req.body.title || req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.path,
      status: 'processing',
      metadata: {
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      }
    });

    await content.save();

    // Process content asynchronously
    await processContentAsync(content);
    await fs.unlink(req.file.path);
    res.json({
      success: true,
      contentId: content._id,
      message: 'Video uploaded successfully. Processing started.'
    });

  } catch (error) {
    logger.error(`Video upload failed: ${error}`);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Upload failed'
    });
  }
});

/**
 * Process YouTube URL
 */
router.post('/upload/youtube', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { error, value } = uploadValidation.youtube.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { url, title } = value;

    const content = new Content({
      userId: req.user!._id,
      type: 'youtube',
      title,
      url,
      status: 'processing'
    });

    await content.save();

    // Process content asynchronously
    await processContentAsync(content);

    res.json({
      success: true,
      contentId: content._id,
      message: 'YouTube URL submitted successfully. Processing started.'
    });

  } catch (error) {
    logger.error(`YouTube processing failed: ${error}`);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Processing failed'
    });
  }
});

/**
 * Generate prerequisites from processed content
 */

router.post('/generate-prerequisites', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: 'contentId is required',
      });
    }

    const content = await Content.findOne({
      _id: contentId,
      userId: req.user!._id
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    if (content.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Content is still processing or failed to process'
      });
    }

    if ((content.prerequisites && content.prerequisites.length > 0) || 
        (content.resources && content.resources.length > 0)) {
      return res.status(200).json({
        success: true,
        message: 'Prerequisites already generated',
        prerequisites: content.prerequisites,
        resources: content.resources
      });
    }

    const textForPrompt = content.extractedText;

    if (!textForPrompt) {
      return res.status(400).json({
        success: false,
        message: 'No text content available for prerequisite extraction'
      });
    }

    const prerequisitesData = await ollamaService.generatePrerequisites(textForPrompt);

    content.prerequisites = prerequisitesData.prerequisites || [];
    content.resources = prerequisitesData.resources || [];

    await content.save();

    res.status(200).json({
      success: true,
      prerequisites: content.prerequisites,
      resources: content.resources,
      message: 'Prerequisites and learning resources saved successfully',
    });

  } catch (error) {
    logger.error(`Prerequisite generation failed: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate prerequisites',
    });
  }
});



/**
 * Generate quiz from processed content
 */
router.post('/generate-quiz', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { error, value } = uploadValidation.quizGeneration.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { contentId, questionCount, difficulty } = value;

    const content = await Content.findOne({
      _id: contentId,
      userId: req.user!._id
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    if (content.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Content is still processing or failed to process'
      });
    }

    // Use translated text if available, otherwise use original
    const textForQuiz = content.translatedText || content.extractedText;

    if (!textForQuiz) {
      return res.status(400).json({
        success: false,
        message: 'No text content available for quiz generation'
      });
    }

    const generatedQuiz = await quizGenerator.generateQuiz(
      textForQuiz,
      content._id.toString(),
      content.type,
      content.title,
      questionCount,
      content.language
    );

    // Save quiz to database
    const quiz = new Quiz({
      userId: req.user!._id,
      contentId: content._id,
      title: generatedQuiz.title,
      questions: generatedQuiz.questions,
      metadata: {
        ...generatedQuiz.metadata,
        difficulty: difficulty || 'mixed'
      }
    });

    await quiz.save();

    // Update content to mark quiz as generated
    content.quizGenerated = true;
    content.quizId = quiz._id;
    await content.save();

    res.status(201).json({
      success: true,
      quiz: {
        id: quiz._id,
        contentId: contentId,
        title: quiz.title,
        questionCount: quiz.questions.length,
        estimatedTime: quiz.metadata.estimatedTime,
        language: quiz.metadata.language
      },
      message: 'Quiz generated successfully'
    });

  } catch (error) {
    logger.error(`Quiz generation failed: ${error}`);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Quiz generation failed'
    });
  }
});

/**
 * Get content status
 */
router.get('/content/:id/status', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const content = await Content.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({
      id: content._id,
      type: content.type,
      title: content.title,
      status: content.status,
      quizGenerated: content.quizGenerated,
      uploadDate: content.createdAt,
      language: content.language,
      error: content.error
    });

  } catch (error) {
    logger.error(`Get content status failed: ${error}`);
    res.status(500).json({ error: 'Failed to get content status' });
  }
});

/**
 * Get quiz by ID
 */
router.get('/quiz/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const quiz = await Quiz.findOne({
      contentId: req.params.id,
      userId: req.user!._id,
      isActive: true
    }).populate('contentId', 'title type');

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);

  } catch (error) {
    logger.error(`Get quiz failed: ${error}`);
    res.status(500).json({ error: 'Failed to get quiz' });
  }
});

/**
 * Get all content for user
 */
router.get('/content', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const contents = await Content.find({ userId: req.user!._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('type title status quizGenerated createdAt language metadata');

    const total = await Content.countDocuments({ userId: req.user!._id });

    res.json({
      success: true,
      contents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error(`Get contents failed: ${error}`);
    res.status(500).json({ error: 'Failed to get contents' });
  }
});

/**
 * Get all quizzes for user
 */
router.get('/quizzes', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const quizzes = await Quiz.find({
      userId: req.user!._id,
      isActive: true
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('contentId', 'title type')
      .select('title questions metadata createdAt');

    const total = await Quiz.countDocuments({
      userId: req.user!._id,
      isActive: true
    });

    res.json({
      success: true,
      quizzes: quizzes.map(quiz => ({
        id: quiz._id,
        title: quiz.title,
        questionCount: quiz.questions.length,
        metadata: quiz.metadata,
        createdAt: quiz.createdAt,
        content: quiz.contentId
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error(`Get quizzes failed: ${error}`);
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
});

/**
 * Delete content
 */
router.delete('/content/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const content = await Content.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Delete associated quizzes
    await Quiz.updateMany(
      { contentId: content._id },
      { isActive: false }
    );

    // Delete content
    await Content.findByIdAndDelete(content._id);

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete content failed: ${error}`);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

/**
 * Process content asynchronously
 */
async function processContentAsync(content: any) {
  const startTime = Date.now();

  try {
    logger.info(`Starting async processing for content: ${content._id}`);

    const result = await contentParser.processContent(content);

    if (result.success) {
      content.status = 'completed';
      content.extractedText = result.extractedText;
      content.language = result.language;
      content.translatedText = result.translatedText;
      content.metadata.processingTime = Date.now() - startTime;

      logger.info(`Content processing completed for: ${content._id}`);
    } else {
      content.status = 'failed';
      content.error = result.error;
      logger.error(`Content processing failed for: ${content._id} - ${result.error}`);
    }

    await content.save();

  } catch (error) {
    logger.error(`Async processing error for ${content._id}: ${error}`);
    content.status = 'failed';
    content.error = error instanceof Error ? error.message : 'Processing failed';
    await content.save();
  }
}

export default router;