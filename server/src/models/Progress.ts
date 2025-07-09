// import mongoose, { Document, Schema } from 'mongoose';

// export interface IProgress extends Document {
//   user: mongoose.Types.ObjectId;
//   topic: mongoose.Types.ObjectId;
//   completedQuizzes: mongoose.Types.ObjectId[];
//   totalScore: number;
//   averageScore: number;
//   streak: number;
//   lastActivityAt: Date;
// }

// const progressSchema = new Schema<IProgress>({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   topic: {
//     type: Schema.Types.ObjectId,
//     ref: 'Topic',
//     required: true
//   },
//   completedQuizzes: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Quiz'
//   }],
//   totalScore: {
//     type: Number,
//     default: 0
//   },
//   averageScore: {
//     type: Number,
//     default: 0
//   },
//   streak: {
//     type: Number,
//     default: 0
//   },
//   lastActivityAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Compound index for user and topic
// progressSchema.index({ user: 1, topic: 1 }, { unique: true });

// export default mongoose.model<IProgress>('Progress', progressSchema);