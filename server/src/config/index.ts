import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_quiz_db',
    testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/dsa_quiz_test_db',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'https://1e9a6c80c226.ngrok-free.app',
    model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
  },
  
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '314572800'), // 10MB
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    tempDir: process.env.TEMP_DIR || 'temp',
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    allowedPdfTypes: ['application/pdf'],
    allowedVideoTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
  
  cors: {
    origin: process.env.FRONTEND_URL || 'https://dsa-hub-h4qb.onrender.com/',
  },
  
  quiz: {
    defaultQuestionCount: 10,
    maxQuestionCount: 20,
    minTextLength: 100,
  },
  
  whisper: {
    model: process.env.WHISPER_MODEL || 'base',
    language: process.env.WHISPER_LANGUAGE || 'en',
  },
  
  translation: {
    googleCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  
  email: {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your app password
  },
},
};

export default config;
