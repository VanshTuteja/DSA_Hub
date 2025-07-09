import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export interface IQuiz extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  contentId: mongoose.Types.ObjectId;
  title: string;
  questions: IQuizQuestion[];
  metadata: {
    contentType: 'pdf' | 'image' | 'youtube' | 'video';
    sourceTitle: string;
    totalQuestions: number;
    estimatedTime: number;
    language?: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const quizQuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    required: true 
  },
  topic: { type: String }
}, { _id: false });

const quizSchema = new Schema<IQuiz>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  questions: [quizQuestionSchema],
  metadata: {
    contentType: {
      type: String,
      enum: ['pdf', 'image', 'youtube', 'video'],
      required: true
    },
    sourceTitle: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    estimatedTime: { type: Number, required: true },
    language: { type: String },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'mixed'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
quizSchema.index({ userId: 1, createdAt: -1 });
quizSchema.index({ contentId: 1 });
quizSchema.index({ isActive: 1 });
quizSchema.index({ 'metadata.difficulty': 1 });

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);