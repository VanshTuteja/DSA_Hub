import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: 'pdf' | 'image' | 'youtube' | 'video';
  title: string;
  originalName?: string;
  filePath?: string;
  url?: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  extractedText?: string;
  language?: string;
  translatedText?: string;
  quizGenerated: boolean;
  quizId: mongoose.Types.ObjectId;
  prerequisites?: string[];
  resources?: {
    title: string;
    url: string;
    topic?: string;
  }[];
  error?: string;
  metadata: {
    fileSize?: number;
    mimeType?: string;
    duration?: number;
    processingTime?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['pdf', 'image', 'youtube', 'video'],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  originalName: { type: String },
  filePath: { type: String },
  url: { type: String },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
  extractedText: { type: String },
  translatedText: { type: String },
  language: { type: String },
  quizGenerated: { type: Boolean, default: false },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  prerequisites: [String],
  resources: [              
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      topic: { type: String },
    }
  ],
  error: { type: String },
  metadata: {
    fileSize: Number,
    mimeType: String,
    duration: Number,
    processingTime: Number,
  },
}, { timestamps: true });

contentSchema.index({ userId: 1, createdAt: -1 });
contentSchema.index({ status: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ quizGenerated: 1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);
