import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITopic extends Document {
  id: string;
  name: string;
  prerequisites: string[];
  totalQuestions: number;
}

const TopicSchema: Schema<ITopic> = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  prerequisites: { type: [String], default: [] },
  totalQuestions: { type: Number, required: true }
});

const TopicModel: Model<ITopic> = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);

export default TopicModel;
