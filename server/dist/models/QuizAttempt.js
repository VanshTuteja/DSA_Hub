"use strict";
// import mongoose, { Document, Schema } from 'mongoose';
// export interface IQuizAnswer {
//   questionId: string;
//   selectedAnswer: number;
//   isCorrect: boolean;
//   timeSpent: number; // in seconds
// }
// export interface IQuizAttempt extends Document {
//   _id: mongoose.Types.ObjectId;
//   userId: mongoose.Types.ObjectId;
//   quizId: mongoose.Types.ObjectId;
//   contentId: mongoose.Types.ObjectId;
//   answers: IQuizAnswer[];
//   score: number;
//   totalQuestions: number;
//   correctAnswers: number;
//   timeStarted: Date;
//   timeCompleted?: Date;
//   totalTimeSpent: number; // in seconds
//   isCompleted: boolean;
//   metadata: {
//     difficulty: string;
//     contentType: string;
//     deviceInfo?: string;
//     ipAddress?: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }
// const quizAnswerSchema = new Schema({
//   questionId: { type: String, required: true },
//   selectedAnswer: { type: Number, required: true, min: 0, max: 3 },
//   isCorrect: { type: Boolean, required: true },
//   timeSpent: { type: Number, default: 0 }
// }, { _id: false });
// const quizAttemptSchema = new Schema<IQuizAttempt>({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   quizId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Quiz',
//     required: true
//   },
//   contentId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Content',
//     required: true
//   },
//   answers: [quizAnswerSchema],
//   score: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 100
//   },
//   totalQuestions: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   correctAnswers: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   timeStarted: {
//     type: Date,
//     required: true
//   },
//   timeCompleted: {
//     type: Date
//   },
//   totalTimeSpent: {
//     type: Number,
//     default: 0
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false
//   },
//   metadata: {
//     difficulty: { type: String, required: true },
//     contentType: { type: String, required: true },
//     deviceInfo: { type: String },
//     ipAddress: { type: String }
//   }
// }, {
//   timestamps: true
// });
// // Indexes for better query performance
// quizAttemptSchema.index({ userId: 1, createdAt: -1 });
// quizAttemptSchema.index({ quizId: 1 });
// quizAttemptSchema.index({ contentId: 1 });
// quizAttemptSchema.index({ isCompleted: 1 });
// quizAttemptSchema.index({ score: -1 });
// // Calculate score before saving
// quizAttemptSchema.pre('save', function(next) {
//   if (this.isModified('answers') || this.isModified('correctAnswers') || this.isModified('totalQuestions')) {
//     this.score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
//   }
//   next();
// });
// export const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);
