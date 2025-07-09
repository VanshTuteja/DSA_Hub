import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import { ContentUpload, ProcessingResult} from '../types/index.js';
import { logger } from '../utils/logger.js';
import { OllamaService } from './ollamaService.js';
import { WhisperService } from './whisperService.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();

const execAsync = promisify(exec);

export class ContentParserService {
  private ollamaService: OllamaService;
  private whisperService: WhisperService;

  constructor() {
    this.ollamaService = new OllamaService();
    this.whisperService = new WhisperService();
  }

  /**
   * Parse PDF content and extract text
   */
  async parsePDF(filePath: string): Promise<string> {
    try {
      logger.info(`Starting PDF parsing for: ${filePath}`);

      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);

      const extractedText = pdfData.text.trim();

      if (!extractedText || extractedText.length < 50) {
        throw new Error('PDF appears to be empty or contains insufficient text');
      }

      logger.info(`PDF parsing completed. Extracted ${extractedText.length} characters`);
      return extractedText;

    } catch (error) {
      logger.error(`PDF parsing failed: ${error}`);
      throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse image content using OCR
   */
  async parseImage(filePath: string): Promise<string> {
    try {
      logger.info(`Starting image OCR for: ${filePath}`);

      // Optimize image for better OCR results
      const optimizedImagePath = await this.optimizeImageForOCR(filePath);

      const { data: { text } } = await Tesseract.recognize(optimizedImagePath, 'eng', {
        logger: (m: { status: string; progress: number; }) => {
          if (m.status === 'recognizing text') {
            logger.info(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      });

      // Clean up optimized image if it's different from original
      if (optimizedImagePath !== filePath) {
        await fs.unlink(optimizedImagePath).catch(() => { });
      }

      const extractedText = text.trim();

      if (!extractedText || extractedText.length < 20) {
        throw new Error('Image appears to contain no readable text');
      }

      logger.info(`Image OCR completed. Extracted ${extractedText.length} characters`);
      return extractedText;

    } catch (error) {
      logger.error(`Image OCR failed: ${error}`);
      throw new Error(`Failed to parse image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse YouTube video transcript with fallback to audio transcription
   */
  async parseYouTube(url: string): Promise<any> {
    try {
      const scriptPath = path.join(__dirname, 'whisper_service.py');
      const command = `python "${scriptPath}" "${url}"`;

      const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 500 });

      if (stderr) {
        console.warn('stderr:', stderr);
      }

      const result = JSON.parse(stdout);
      return { text: result.text, language: 'english' };
    } catch (error: any) {
      console.error('Content processing failed:', error);
      throw new Error(`Failed to parse YouTube video: ${error.message}`);
    }
  }

  /**
   * Process uploaded video file
   */
  async parseVideo(filePath: string): Promise<{ text: string; language: string }> {
    try {
      logger.info(`Starting video transcription for: ${filePath}`);

      const scriptPath = path.join(__dirname, 'whisper_video_service.py');
      const command = `python "${scriptPath}" "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 1024 });

      if (stderr) {
        logger.warn(`stderr from Python script: ${stderr}`);
      }

      const result = JSON.parse(stdout);
      return { text: result.text, language: 'english' };
    } catch (error: any) {
      logger.error('Video transcription failed:', error);
      throw new Error(`Failed to parse video: ${error.message}`);
    }
  }

  /**
   * Optimize image for better OCR results
   */
  private async optimizeImageForOCR(filePath: string): Promise<string> {
    try {
      const optimizedPath = filePath.replace(/\.[^/.]+$/, '_optimized.png');

      await sharp(filePath)
        .resize(null, 1000, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .greyscale()
        .normalize()
        .sharpen()
        .png({ quality: 100 })
        .toFile(optimizedPath);

      return optimizedPath;
    } catch (error) {
      logger.warn(`Image optimization failed, using original: ${error}`);
      return filePath;
    }
  }

  /**
   * Process content based on type with language detection and translation
   */
  async processContent(content: ContentUpload): Promise<ProcessingResult> {
    try {
      let extractedText: string;
      let language: string = 'english';
      let translatedText: string | undefined;

      switch (content.type) {
        case 'pdf':
          if (!content.filePath) throw new Error('File path required for PDF');
          extractedText = await this.parsePDF(content.filePath);
          // language = await this.ollamaService.detectLanguage(extractedText);
          break;

        case 'image':
          if (!content.filePath) throw new Error('File path required for image');
          extractedText = await this.parseImage(content.filePath);
          // language = await this.ollamaService.detectLanguage(extractedText);
          break;

        case 'youtube':
          if (!content.url) throw new Error('URL required for YouTube video');
          const youtubeResult = await this.parseYouTube(content.url);
          extractedText = youtubeResult.text;
          language = youtubeResult.language;
          break;

        case 'video':
          if (!content.filePath) throw new Error('File path required for video');
          const videoResult = await this.parseVideo(content.filePath);
          extractedText = videoResult.text;
          language = videoResult.language;
          break;

        default:
          throw new Error(`Unsupported content type: ${content.type}`);
      }

      // Translate to English if not already in English
      // if (language !== 'english' && language !== 'en' && language !== 'unknown') {
      //   try {
      //     logger.info(`Translating content from ${language} to English`);
      //     translatedText = await this.ollamaService.translateToEnglish(extractedText, language);
      //   } catch (translationError) {
      //     logger.warn(`Translation failed, using original text: ${translationError}`);
      //     translatedText = extractedText;
      //   }
      // }

      return {
        success: true,
        contentId: content.id,
        extractedText,
        language,
        translatedText
      };

    } catch (error) {
      logger.error(`Content processing failed for ${content.id}: ${error}`);
      return {
        success: false,
        contentId: content.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}