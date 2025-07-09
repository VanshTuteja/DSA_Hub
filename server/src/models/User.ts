import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
    bio?: string;
    contact?: number;
    country?: string;
  };
  stats: {
    totalQuizzes: number;
    totalScore: number;
    averageScore: number;
    streak: number;
    lastActivity: Date;
    totalTimeSpent: number;
  };
  masteredTopics: string[];
  createdAt: Date;
  updatedAt: Date;
  admin: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    profilePicture: { type: String, default: "" },
    bio: { type: String, maxlength: 500 },
    contact: { type: Number, trim: true },
    country: { type: String, trim: true }
  },
  stats: {
    totalQuizzes: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActivity: { type: Date},
    totalTimeSpent: { type: Number, default: 0 }
  },
  masteredTopics: [{ type: String }],
  admin: { type: Boolean, default: false },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'stats.averageScore': -1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


// Update average score when stats change
userSchema.pre('save', function (next) {
  if (this.isModified('stats.totalQuizzes') || this.isModified('stats.totalScore')) {
    if (this.stats.totalQuizzes > 0) {
      this.stats.averageScore = Math.round((this.stats.totalScore / this.stats.totalQuizzes) * 100) / 100;
    }
  }
  next();
});



export const User = mongoose.model<IUser>('User', userSchema);