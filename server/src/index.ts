import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth';
import contentRoutes from '../src/routes/content';
import cookieParser from "cookie-parser";
import topicRoutes from '../src/routes/topic';
import config from './config/index';
import { logger } from './utils/logger';
import { dbConnection } from './database/connection';

const app = express();

const DIRNAME = path.resolve();

// default middleware for any mern project
// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
// Security middleware
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https:"],
      // Add others as needed (e.g., fontSrc, frameSrc)
    },
  })
);
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);



// Create necessary directories
const directories = [
  config.upload.uploadDir,
  config.upload.tempDir
];

directories.forEach(dir => {
  const dirPath = path.resolve(dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger.info(`Created directory: ${dirPath}`);
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/content', contentRoutes);
// app.use('/api/quiz', quizRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbHealth = await dbConnection.healthCheck();
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      database: dbHealth,
      services: {
        ollama: {
          baseUrl: config.ollama.baseUrl,
          model: config.ollama.model
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Server error: ${error.message}`);
  
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
    error: config.nodeEnv === 'development' ? error.message : 'Internal server error' 
  });
});


app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});

// Initialize database and start server
async function startServer() {
  try {
    // Connect to MongoDB
    await dbConnection.connect();
    
    // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
      logger.info(`Upload directory: ${path.resolve(config.upload.uploadDir)}`);
      logger.info(`Temp directory: ${path.resolve(config.upload.tempDir)}`);
      logger.info(`CORS origin: ${config.cors.origin}`);
      logger.info(`Ollama URL: ${config.ollama.baseUrl}`);
      logger.info(`Ollama Model: ${config.ollama.model}`);
      logger.info(`MongoDB URI: ${config.mongodb.uri}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;






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