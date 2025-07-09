import Joi from 'joi';

export const uploadValidation = {
  youtube: Joi.object({
    url: Joi.string()
      .uri()
      .pattern(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
      .required()
      .messages({
        'string.pattern.base': 'Please provide a valid YouTube URL'
      }),
    title: Joi.string().min(1).max(200).required()
  }),

  quizGeneration: Joi.object({
    contentId: Joi.string().required(),
    questionCount: Joi.number().integer().min(5).max(20).default(10),
    difficulty: Joi.string().valid('easy', 'medium', 'hard', 'mixed').default('mixed')
  })
};

export const authValidation = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6),
    firstName: Joi.string().max(50).optional(),
    lastName: Joi.string().max(50).optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().min(6).optional(),
  }),

  updateProfile: Joi.object({
    profile: Joi.object({
      firstName: Joi.string().max(50).optional(),
      lastName: Joi.string().max(50).optional(),
      bio: Joi.string().max(500).optional()
    }).optional(),
    preferences: Joi.object({
      difficulty: Joi.string().valid('easy', 'medium', 'hard', 'mixed').optional(),
      questionCount: Joi.number().integer().min(5).max(20).optional(),
      timeLimit: Joi.number().integer().min(300).max(7200).optional()
    }).optional()
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
};

export const quizValidation = {
  submitAnswer: Joi.object({
    questionId: Joi.string().required(),
    selectedAnswer: Joi.number().integer().min(0).max(3).required(),
    timeSpent: Joi.number().integer().min(0).optional()
  })
};

export const validateFileUpload = (file: Express.Multer.File, allowedTypes: string[]) => {
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error(`File type ${file.mimetype} is not allowed`);
  }

  return true;
};