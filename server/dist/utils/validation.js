"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileUpload = exports.quizValidation = exports.authValidation = exports.uploadValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.uploadValidation = {
    youtube: joi_1.default.object({
        url: joi_1.default.string()
            .uri()
            .pattern(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
            .required()
            .messages({
            'string.pattern.base': 'Please provide a valid YouTube URL'
        }),
        title: joi_1.default.string().min(1).max(200).required()
    }),
    quizGeneration: joi_1.default.object({
        contentId: joi_1.default.string().required(),
        questionCount: joi_1.default.number().integer().min(5).max(20).default(10),
        difficulty: joi_1.default.string().valid('easy', 'medium', 'hard', 'mixed').default('mixed')
    })
};
exports.authValidation = {
    register: joi_1.default.object({
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().min(6),
        firstName: joi_1.default.string().max(50).optional(),
        lastName: joi_1.default.string().max(50).optional()
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().min(6).optional(),
    }),
    updateProfile: joi_1.default.object({
        profile: joi_1.default.object({
            firstName: joi_1.default.string().max(50).optional(),
            lastName: joi_1.default.string().max(50).optional(),
            bio: joi_1.default.string().max(500).optional()
        }).optional(),
        preferences: joi_1.default.object({
            difficulty: joi_1.default.string().valid('easy', 'medium', 'hard', 'mixed').optional(),
            questionCount: joi_1.default.number().integer().min(5).max(20).optional(),
            timeLimit: joi_1.default.number().integer().min(300).max(7200).optional()
        }).optional()
    }),
    changePassword: joi_1.default.object({
        currentPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().min(6).required()
    })
};
exports.quizValidation = {
    submitAnswer: joi_1.default.object({
        questionId: joi_1.default.string().required(),
        selectedAnswer: joi_1.default.number().integer().min(0).max(3).required(),
        timeSpent: joi_1.default.number().integer().min(0).optional()
    })
};
const validateFileUpload = (file, allowedTypes) => {
    if (!allowedTypes.includes(file.mimetype)) {
        throw new Error(`File type ${file.mimetype} is not allowed`);
    }
    return true;
};
exports.validateFileUpload = validateFileUpload;
