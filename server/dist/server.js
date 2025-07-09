"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_js_1 = require("./config/index.js");
const logger_js_1 = require("./utils/logger.js");
const connection_js_1 = require("./database/connection.js");
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const content_js_1 = __importDefault(require("./routes/content.js"));
// import quizRoutes from './routes/quiz.js';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const topic_js_1 = __importDefault(require("./routes/topic.js"));
const app = (0, express_1.default)();
const DIRNAME = path_1.default.resolve();
// default middleware for any mern project
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: index_js_1.config.cors.origin,
    credentials: true
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: index_js_1.config.rateLimit.windowMs,
    max: index_js_1.config.rateLimit.maxRequests,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);
// Create necessary directories
const directories = [
    index_js_1.config.upload.uploadDir,
    index_js_1.config.upload.tempDir
];
directories.forEach(dir => {
    const dirPath = path_1.default.resolve(dir);
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
        logger_js_1.logger.info(`Created directory: ${dirPath}`);
    }
});
// Routes
app.use('/api/auth', auth_js_1.default);
app.use('/api/topic', topic_js_1.default);
app.use('/api/content', content_js_1.default);
// app.use('/api/quiz', quizRoutes);
// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const dbHealth = await connection_js_1.dbConnection.healthCheck();
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: index_js_1.config.nodeEnv,
            database: dbHealth,
            services: {
                ollama: {
                    baseUrl: index_js_1.config.ollama.baseUrl,
                    model: index_js_1.config.ollama.model
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Error handling middleware
app.use((error, req, res, next) => {
    logger_js_1.logger.error(`Server error: ${error.message}`);
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            error: 'File too large. Maximum size is 100MB.'
        });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            error: 'Unexpected file field.'
        });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation error',
            details: error.message
        });
    }
    if (error.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format'
        });
    }
    res.status(500).json({
        error: index_js_1.config.nodeEnv === 'development' ? error.message : 'Internal server error'
    });
});
app.use(express_1.default.static(path_1.default.join(DIRNAME, "/client/dist")));
// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });
app.use("*", (_, res) => {
    res.sendFile(path_1.default.resolve(DIRNAME, "client", "dist", "index.html"));
});
// Initialize database and start server
async function startServer() {
    try {
        // Connect to MongoDB
        await connection_js_1.dbConnection.connect();
        // Start server
        app.listen(index_js_1.config.port, () => {
            logger_js_1.logger.info(`Server running on port ${index_js_1.config.port} in ${index_js_1.config.nodeEnv} mode`);
            logger_js_1.logger.info(`Upload directory: ${path_1.default.resolve(index_js_1.config.upload.uploadDir)}`);
            logger_js_1.logger.info(`Temp directory: ${path_1.default.resolve(index_js_1.config.upload.tempDir)}`);
            logger_js_1.logger.info(`CORS origin: ${index_js_1.config.cors.origin}`);
            logger_js_1.logger.info(`Ollama URL: ${index_js_1.config.ollama.baseUrl}`);
            logger_js_1.logger.info(`Ollama Model: ${index_js_1.config.ollama.model}`);
            logger_js_1.logger.info(`MongoDB URI: ${index_js_1.config.mongodb.uri}`);
        });
    }
    catch (error) {
        logger_js_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
exports.default = app;
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import path from 'path';
// import fs from 'fs';
// import { config } from './config/index.js';
// import { logger } from './utils/logger.js';
// import contentRoutes from './routes/content.js';
// // import connectDB from "./db/connectDB";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// // import userRoute from "./routes/user.route";
// const app = express();
// const DIRNAME = path.resolve();
// // Security middleware
// app.use(helmet());
// // default middleware for any mern project
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: config.cors.origin,
//   credentials: true
// }));
// // Rate limiting
// const limiter = rateLimit({
//   windowMs: config.rateLimit.windowMs,
//   max: config.rateLimit.maxRequests,
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);
// // Create upload directory if it doesn't exist
// const uploadDir = path.resolve(config.upload.uploadDir);
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   logger.info(`Created upload directory: ${uploadDir}`);
// }
// // Routes
// app.use('/api/content', contentRoutes);
// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     environment: config.nodeEnv
//   });
// });
// // Error handling middleware
// app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   logger.error(`Server error: ${error.message}`);
//   if (error.code === 'LIMIT_FILE_SIZE') {
//     return res.status(400).json({ 
//       error: 'File too large. Maximum size is 10MB.' 
//     });
//   }
//   if (error.code === 'LIMIT_UNEXPECTED_FILE') {
//     return res.status(400).json({ 
//       error: 'Unexpected file field.' 
//     });
//   }
//   res.status(500).json({ 
//     error: config.nodeEnv === 'development' ? error.message : 'Internal server error' 
//   });
// });
// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });
// app.use(express.static(path.join(DIRNAME,"/client/dist")));
// // app.use("*",(_,res) => {
// //     res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
// // });
// // Start server
// app.listen(config.port, () => {
//   // connectDB();
//   logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
//   logger.info(`Upload directory: ${uploadDir}`);
//   logger.info(`CORS origin: ${config.cors.origin}`);
// });
// export default app;
