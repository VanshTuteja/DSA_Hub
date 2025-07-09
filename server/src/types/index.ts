import { Types } from "mongoose";

export interface ContentUpload {
  id: string;
  type: 'pdf' | 'image' | 'youtube' | 'video';
  title: string;
  originalName?: string;
  filePath?: string;
  url?: string;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'failed';
  extractedText?: string;
  quizGenerated: boolean;
  error?: string;
  language?: string;
  translatedText?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export interface GeneratedQuiz {
  id: string;
  contentId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: Date;
  metadata: {
    contentType: 'pdf' | 'image' | 'youtube' | 'video';
    sourceTitle: string;
    totalQuestions: number;
    estimatedTime: number;
    language?: string;
  };
}

export interface OllamaQuizResponse {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topic?: string;
  }>;
}

export interface YouTubeTranscript {
  text: string;
  duration: number;
  offset: number;
}

export interface ProcessingResult {
  success: boolean;
  contentId: string;
  extractedText?: string;
  language?: string;
  translatedText?: string;
  error?: string;
}

export interface TranscriptionResult {
  text: string;
  language: string;
  confidence?: number;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage: string;
  confidence?: number;
}


export interface ITopic {
  id: string;
  name: string;
  prerequisites: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  score: number;
  totalQuestions: number;
  attempts: number;
  bestScore: number;
}

export interface IUserTopic extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  topicId: string;
  name: string;
  prerequisites: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  score: number;
  totalQuestions: number;
  attempts: number;
  bestScore: number;
  createdAt: Date;
  updatedAt: Date;
}