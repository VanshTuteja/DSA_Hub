import { Ollama } from 'ollama';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { OllamaQuizResponse } from '../types/index.js';

export class OllamaService {
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({
      host: config.ollama.baseUrl,
    });
  }

  /**
   * Check if Ollama is running and model is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const models = await this.ollama.list();
      const modelExists = models.models.some(model =>
        model.name.includes(config.ollama.model.split(':')[0])
      );

      if (!modelExists) {
        logger.warn(`Model ${config.ollama.model} not found. Available models:`,
          models.models.map(m => m.name));
        return false;
      }

      return true;
    } catch (error) {
      logger.error(`Ollama health check failed: ${error}`);
      return false;
    }
  }

  /**
   * Generate quiz questions using Ollama
   */
  async generateQuiz(
    text: string,
    questionCount: number = 10,
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed' = 'mixed'
  ): Promise<OllamaQuizResponse> {
    try {
      const prompt = this.buildQuizPrompt(text, questionCount, difficulty);

      const response = await this.ollama.generate({
        model: config.ollama.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
        },
      });

      return this.parseQuizResponse(response.response);
    } catch (error) {
      logger.error(`Quiz generation failed: ${error}`);
      throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generatePrerequisites(text: string): Promise<{
    prerequisites: string[];
    resources: {
      title: string;
      url: string;
      topic: string;
    }[];
  }> {
    try {
      const prompt = this.buildPrerequisitePrompt(text);

      const response = await this.ollama.generate({
        model: config.ollama.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
        },
      });

      const raw = response.response?.trim();
      if (!raw) {
        throw new Error("No response from Ollama");
      }

      const parsed = JSON.parse(raw);
      return parsed;
    } catch (error) {
      logger.error(`Prerequisite generation failed: ${error}`);
      throw new Error(`Failed to generate prerequisites: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }


  /**
   * Detect language of text
   */
  async detectLanguage(text: string): Promise<string> {
    try {
      const prompt = `Detect the language of the following text and respond with only the language name in English (e.g., "English", "Spanish", "French", etc.):

Text: "${text.substring(0, 500)}"

Language:`;

      const response = await this.ollama.generate({
        model: config.ollama.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.1,
        },
      });

      return response.response.trim().toLowerCase();
    } catch (error) {
      logger.error(`Language detection failed: ${error}`);
      return 'unknown';
    }
  }

  /**
   * Translate text to English
   */
  async translateToEnglish(text: string, sourceLanguage?: string): Promise<string> {
    try {
      const languageHint = sourceLanguage ? ` from ${sourceLanguage}` : '';
      const prompt = `Translate the following text${languageHint} to English. Provide only the translation without any additional text or explanations:

Text: "${text}"

Translation:`;

      const response = await this.ollama.generate({
        model: config.ollama.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
        },
      });

      return response.response.trim();
    } catch (error) {
      logger.error(`Translation failed: ${error}`);
      throw new Error(`Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Summarize long text for better processing
   */
  async summarizeText(text: string, maxLength: number = 2000): Promise<string> {
    if (text.length <= maxLength) {
      return text;
    }

    try {
      const prompt = `Summarize the following text while preserving all key information, concepts, and important details. The summary should be comprehensive but concise:

Text: "${text}"

Summary:`;

      const response = await this.ollama.generate({
        model: config.ollama.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
        },
      });

      return response.response.trim();
    } catch (error) {
      logger.error(`Text summarization failed: ${error}`);
      return text.substring(0, maxLength);
    }
  }

  /**
   * Build quiz generation prompt
   */
  private buildQuizPrompt(text: string, questionCount: number, difficulty: string): string {
    const difficultyInstruction = difficulty === 'mixed'
      ? 'Mix easy, medium, and hard questions'
      : `Make all questions ${difficulty} difficulty`;
    // about Data Structures and Algorithms concepts
    // 5. Focus on DSA concepts, algorithms, time/space complexity, and implementation details
    return `Based on the following content, create ${questionCount} multiple-choice quiz questions.

Content:
"""
${text}
"""

Requirements:
1. Create exactly ${questionCount} questions
2. Each question should have 4 options (A, B, C, D)
3. Include the correct answer index (0-3)
4. Provide a brief explanation for each correct answer
5. Make questions practical and test understanding, not just memorization
6. All questions must have a difficulty level - ${difficulty}


Respond with a JSON object in this exact format:
{
  "questions": [
    {
      "question": "What is the time complexity of binary search?",
      "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      "correctAnswer": 1,
      "explanation": "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      "difficulty": "medium",
      "topic": "Search Algorithms"
    }
  ]
}

Ensure the JSON is valid and properly formatted. Do not include any text before or after the JSON.`;
  }


  private buildPrerequisitePrompt(text: string): string {
    return `Analyze the following content and extract:

1. A list of prerequisite topics or concepts a learner should know **before** studying this content.
2. A list of 3-5 recommended resources (with links if possible) to learn those prerequisites.

Content:
"""
${text}
"""

Respond with a JSON object in **this exact format**:

{
  "prerequisites": [
    "Recursion",
    "Time Complexity",
    "Hash Tables"
  ],
  "resources": [
    {
      "title": "Introduction to Recursion - GeeksforGeeks",
      "url": "https://www.geeksforgeeks.org/recursion/",
      "topic": "Recursion"
    },
    {
      "title": "Big-O Notation Explained",
      "url": "https://www.freecodecamp.org/news/big-o-notation-explained-with-examples/",
      "topic": "Time Complexity"
    },
    {
      "title": "Hash Tables in JavaScript",
      "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
      "topic": "Hash Tables"
    }
  ]
}

Guidelines:
- Only include prerequisites that are **essential** to understand the content.
- Ensure resource titles and URLs are accurate and relevant.
- Keep the response strictly as JSON. Do **not** add any extra explanation or text.`;
  }


  /**
   * Parse Ollama response and validate structure
   */
  private parseQuizResponse(response: string): OllamaQuizResponse {
    try {
      // Clean the response - remove any markdown formatting or extra text
      let cleanedResponse = response.trim();

      // Find JSON content between curly braces
      const jsonStart = cleanedResponse.indexOf('{');
      const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
      }

      const parsed = JSON.parse(cleanedResponse);

      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response format: questions array not found');
      }

      // Validate each question
      parsed.questions = parsed.questions.filter(q => this.validateQuestion(q));

      if (parsed.questions.length === 0) {
        throw new Error('No valid questions found in response');
      }

      return parsed as OllamaQuizResponse;
    } catch (error) {
      logger.error(`Failed to parse Ollama response: ${error}`);
      logger.error(`Raw response: ${response}`);
      throw new Error('Failed to parse quiz generation response');
    }
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
}