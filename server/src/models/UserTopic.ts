import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUserTopic extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  topicId: string;
  name: string;
  prerequisites: string[];
  status: 'not-started' | 'in-progress' | 'completed'|'mastered';
  score: number;
  totalQuestions: number;
  attempts: number;
  bestScore: number;
  lastAttempt:Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserTopicSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed','mastered'],
    default: 'not-started'
  },
  score: {
    type: Number,
    default: 0,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  attempts: {
    type: Number,
    default: 0,
    min: 0
  },
  bestScore: {
    type: Number,
    default: 0,
    min: 0
  },
  lastAttempt: {
    type: Date,
  }
}, {
  timestamps: true
});

// Compound index to ensure one topic per user
UserTopicSchema.index({ userId: 1, topicId: 1 }, { unique: true });

export const UserTopic = mongoose.model<IUserTopic>('UserTopic', UserTopicSchema);