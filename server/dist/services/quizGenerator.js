"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGeneratorService = void 0;
const uuid_1 = require("uuid");
const index_js_1 = require("../config/index.js");
const logger_js_1 = require("../utils/logger.js");
const ollamaService_js_1 = require("./ollamaService.js");
class QuizGeneratorService {
    constructor() {
        this.ollamaService = new ollamaService_js_1.OllamaService();
    }
    /**
     * Generate quiz questions from extracted text using Ollama
     */
    async generateQuiz(extractedText, contentId, contentType, sourceTitle, questionCount = index_js_1.config.quiz.defaultQuestionCount, language) {
        try {
            logger_js_1.logger.info(`Generating quiz for content: ${contentId}`);
            if (extractedText.length < index_js_1.config.quiz.minTextLength) {
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
            const quizData = await this.ollamaService.generateQuiz(textToProcess, questionCount, 'mixed');
            const questions = this.processQuestions(quizData.questions);
            const quiz = {
                id: (0, uuid_1.v4)(),
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
            logger_js_1.logger.info(`Quiz generated successfully with ${questions.length} questions`);
            return quiz;
        }
        catch (error) {
            logger_js_1.logger.error(`Quiz generation failed: ${error}`);
            throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Process and validate questions
     */
    processQuestions(questions) {
        return questions
            .filter(q => this.validateQuestion(q))
            .map(q => ({
            id: (0, uuid_1.v4)(),
            question: q.question.trim(),
            options: q.options.map((opt) => opt.trim()),
            correctAnswer: q.correctAnswer,
            explanation: q.explanation?.trim() || 'No explanation provided',
            difficulty: q.difficulty || 'medium',
            topic: q.topic?.trim()
        }));
    }
    /**
     * Validate individual question structure
     */
    validateQuestion(question) {
        return (question &&
            typeof question.question === 'string' &&
            Array.isArray(question.options) &&
            question.options.length === 4 &&
            typeof question.correctAnswer === 'number' &&
            question.correctAnswer >= 0 &&
            question.correctAnswer < 4 &&
            question.options.every((opt) => typeof opt === 'string' && opt.trim().length > 0));
    }
    /**
     * Generate quiz with custom parameters
     */
    async generateCustomQuiz(extractedText, contentId, contentType, sourceTitle, options = {}) {
        const questionCount = Math.min(options.questionCount || index_js_1.config.quiz.defaultQuestionCount, index_js_1.config.quiz.maxQuestionCount);
        return this.generateQuiz(extractedText, contentId, contentType, sourceTitle, questionCount, options.language);
    }
}
exports.QuizGeneratorService = QuizGeneratorService;
