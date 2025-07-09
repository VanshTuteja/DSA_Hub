// models/QuizAttempt.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStandaredQuizAttempt extends Document {
  userId: Types.ObjectId;
  attemptId: string;
  topicId: string;
  contentId?:Types.ObjectId;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty?: string;
  }[];
  userAnswers: number[];
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeStarted: Date;
  timeCompleted: Date;
  timeTaken: number;
  isRetake: boolean;
  originalAttemptId?: string;
  createdAt: Date;
}

const StandaredQuizAttemptSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attemptId: { type: String, required: true },
    topicId: { type: String, required: true },
    contentId: {
    type: Schema.Types.ObjectId,
    ref: 'Content'
  },
    questions: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true },
        explanation: { type: String, required: true }, 
        difficulty:{ type: String }
      }
    ],
    userAnswers: [{ type: Number, required: true }],
    score: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeStarted: { type: Date, required: true },
    timeCompleted: { type: Date, required: true },
    timeTaken: { type: Number, required: true },
    isRetake: { type: Boolean, default: false },
    originalAttemptId: { type: String, default: null }
  },
  { timestamps: true }
);

export const StandaredQuizAttempt = mongoose.model<IStandaredQuizAttempt>('StandaredQuizAttempt', StandaredQuizAttemptSchema);
