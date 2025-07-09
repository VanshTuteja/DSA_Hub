export interface Topic {
  id: string;
  name: string;
  prerequisites: string[];
  status: 'not-started' | 'in-progress' | 'mastered' | 'ready'|'locked';
  score?: number;
  totalQuestions?: number;
  attempts?: number;
  bestScore?: number;
  lastAttempt?: Date | string; // Allow both Date and string for persistence
}

export interface UserProfile {
  name: string;
  email:string;
  avatar?: string;
  masteredTopics: string[];
  totalScore?: number;
  averageScore:number;
  streak: number;
}

// Backend Content Model
export interface ResourceLink {
  title: string;
  url: string;
  topic?: string;
}

export interface CustomContent {
  id: string;
  type: 'youtube' | 'pdf' | 'image' | 'video';
  title: string;
  url?: string;
  fileName?: string;
  originalName?: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'failed' | 'uploading' | 'completed';
  quizGenerated?: boolean;
  extractedText?: string;
  translatedText?: string;
  language?: string;
  error?: string;
  prerequisites?: string[];         // ✅ Array of prerequisite topics
  resources?: ResourceLink[];       // ✅ Array of resource links
  metadata?: {
    fileSize?: number;
    mimeType?: string;
    processingTime?: number;
  };
}


// Backend Quiz Model
export interface Quiz {
  id: string;
  title: string;
  contentId?: string;
  questions: QuizQuestion[];
  metadata?: {
    estimatedTime?: number;
    language?: string;
    difficulty?: string;
    questionCount?: number;
  };
  createdAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  id?: string; // Unique identifier for this attempt
  topicId?: string;
  contentId?: string;
  quizId?: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: (number | undefined)[];
  score: number;
  isCompleted: boolean;
  timeStarted: Date;
  timeCompleted?: Date;
  timeLimit: number;
  timeRemaining: number;
  attempt?: number;
  isRetake?: boolean;
  originalAttemptId?: string;
}

// Quiz Attempt Record
export interface QuizAttempt {
  id: string;
  attemptId: string;
  topicId: string;
  questions: QuizQuestion[];
  userAnswers: (number | undefined)[];
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeStarted: Date;
  timeCompleted: Date;
  timeTaken: number; // in seconds
  isRetake: boolean;
  originalAttemptId?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContentStatusResponse {
  id: string;
  type: string;
  title: string;
  status: string;
  quizGenerated: boolean;
  uploadDate: string;
  language?: string;
  error?: string;
}

export interface QuizGenerationResponse {
  success: boolean;
  quiz?: {
    id: string;
    contentId:string;
    title: string;
    questionCount: number;
    estimatedTime?: number;
    language?: string;
  };
  message:string;
}

export interface ContentListResponse {
  success: boolean;
  contents: CustomContent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface QuizListResponse {
  success: boolean;
  quizzes: Array<{
    id: string;
    title: string;
    questionCount: number;
    metadata: any;
    createdAt: string;
    content: any;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Upload Types
export interface UploadProgress {
  contentId: string;
  progress: number;
  stage: 'uploading' | 'processing' | 'generating' | 'completed' | 'failed';
  message?: string;
}

export type FilterType = 'all' | 'mastered' | 'continue' | 'start' | 'locked';

export interface QuizScore {
  contentId: string;
  total: number;
  correct: number;
  percentage: number;
  attempt: number;
  completedAt: Date;
}