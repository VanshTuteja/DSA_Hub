import { v4 as uuidv4 } from 'uuid';
import { QuizQuestion, GeneratedQuiz } from '../types/index';
import { config } from '../config/index';
import { logger } from '../utils/logger';
import { OllamaService } from './ollamaService';

export class QuizGeneratorService {
  private ollamaService: OllamaService;

  constructor() {
    this.ollamaService = new OllamaService();
  }

  /**
   * Generate quiz questions from extracted text using Ollama
   */
  async generateQuiz(
    extractedText: string,
    contentId: string,
    contentType: 'pdf' | 'image' | 'youtube' | 'video',
    sourceTitle: string,
    questionCount: number = config.quiz.defaultQuestionCount,
    language?: string
  ): Promise<GeneratedQuiz> {
    try {
      logger.info(`Generating quiz for content: ${contentId}`);
      
      if (extractedText.length < config.quiz.minTextLength) {
        throw new Error('Content is too short to generate meaningful quiz questions');
      }

      // Use translated text if available and original is not in English
      let textToProcess = extractedText;
      
      // Summarize if text is too long
      // const maxTextLength = 8000;
      // if (textToProcess.length > maxTextLength) {
      //   logger.info('Text too long, summarizing...');
      //   textToProcess = await this.ollamaService.summarizeText(textToProcess, maxTextLength);
      // }

      const quizData = await this.ollamaService.generateQuiz(
        textToProcess,
        questionCount,
        'mixed'
      );
      
      const questions = this.processQuestions(quizData.questions);

      const quiz: GeneratedQuiz = {
        id: uuidv4(),
        contentId,
        title: `Quiz: ${sourceTitle}`,
        questions,
        createdAt: new Date(),
        metadata: {
          contentType,
          sourceTitle,
          totalQuestions: questions.length,
          estimatedTime: questions.length * 2, // 2 minutes per question
          language
        }
      };

      logger.info(`Quiz generated successfully with ${questions.length} questions`);
      return quiz;

    } catch (error) {
      logger.error(`Quiz generation failed: ${error}`);
      throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Process and validate questions
   */
  private processQuestions(questions: any[]): QuizQuestion[] {
    return questions
      .filter(q => this.validateQuestion(q))
      .map(q => ({
        id: uuidv4(),
        question: q.question.trim(),
        options: q.options.map((opt: string) => opt.trim()),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation?.trim() || 'No explanation provided',
        difficulty: q.difficulty || 'medium',
        topic: q.topic?.trim()
      }));
  }

  /**
   * Validate individual question structure
   */
  private validateQuestion(question: any): boolean {
    return (
      question &&
      typeof question.question === 'string' &&
      Array.isArray(question.options) &&
      question.options.length === 4 &&
      typeof question.correctAnswer === 'number' &&
      question.correctAnswer >= 0 &&
      question.correctAnswer < 4 &&
      question.options.every((opt: any) => typeof opt === 'string' && opt.trim().length > 0)
    );
  }

  /**
   * Generate quiz with custom parameters
   */
  async generateCustomQuiz(
    extractedText: string,
    contentId: string,
    contentType: 'pdf' | 'image' | 'youtube' | 'video',
    sourceTitle: string,
    options: {
      questionCount?: number;
      difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
      focusTopics?: string[];
      language?: string;
    } = {}
  ): Promise<GeneratedQuiz> {
    const questionCount = Math.min(
      options.questionCount || config.quiz.defaultQuestionCount,
      config.quiz.maxQuestionCount
    );

    return this.generateQuiz(
      extractedText, 
      contentId, 
      contentType, 
      sourceTitle, 
      questionCount,
      options.language
    );
  }
}