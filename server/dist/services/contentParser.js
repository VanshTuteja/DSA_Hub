"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentParserService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const sharp_1 = __importDefault(require("sharp"));
const logger_js_1 = require("../utils/logger.js");
const ollamaService_js_1 = require("./ollamaService.js");
const whisperService_js_1 = require("./whisperService.js");
const child_process_1 = require("child_process");
const util_1 = require("util");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class ContentParserService {
    constructor() {
        this.ollamaService = new ollamaService_js_1.OllamaService();
        this.whisperService = new whisperService_js_1.WhisperService();
    }
    /**
     * Parse PDF content and extract text
     */
    async parsePDF(filePath) {
        try {
            logger_js_1.logger.info(`Starting PDF parsing for: ${filePath}`);
            const dataBuffer = await promises_1.default.readFile(filePath);
            const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
            const extractedText = pdfData.text.trim();
            if (!extractedText || extractedText.length < 50) {
                throw new Error('PDF appears to be empty or contains insufficient text');
            }
            logger_js_1.logger.info(`PDF parsing completed. Extracted ${extractedText.length} characters`);
            return extractedText;
        }
        catch (error) {
            logger_js_1.logger.error(`PDF parsing failed: ${error}`);
            throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Parse image content using OCR
     */
    async parseImage(filePath) {
        try {
            logger_js_1.logger.info(`Starting image OCR for: ${filePath}`);
            // Optimize image for better OCR results
            const optimizedImagePath = await this.optimizeImageForOCR(filePath);
            const { data: { text } } = await tesseract_js_1.default.recognize(optimizedImagePath, 'eng', {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        logger_js_1.logger.info(`OCR Progress: ${Math.round(m.progress * 100)}%`);
                    }
                }
            });
            // Clean up optimized image if it's different from original
            if (optimizedImagePath !== filePath) {
                await promises_1.default.unlink(optimizedImagePath).catch(() => { });
            }
            const extractedText = text.trim();
            if (!extractedText || extractedText.length < 20) {
                throw new Error('Image appears to contain no readable text');
            }
            logger_js_1.logger.info(`Image OCR completed. Extracted ${extractedText.length} characters`);
            return extractedText;
        }
        catch (error) {
            logger_js_1.logger.error(`Image OCR failed: ${error}`);
            throw new Error(`Failed to parse image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Parse YouTube video transcript with fallback to audio transcription
     */
    async parseYouTube(url) {
        try {
            const scriptPath = path_1.default.join(__dirname, 'whisper_service.py');
            const command = `python "${scriptPath}" "${url}"`;
            const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 500 });
            if (stderr) {
                console.warn('stderr:', stderr);
            }
            const result = JSON.parse(stdout);
            return { text: result.text, language: 'english' };
        }
        catch (error) {
            console.error('Content processing failed:', error);
            throw new Error(`Failed to parse YouTube video: ${error.message}`);
        }
    }
    /**
     * Process uploaded video file
     */
    async parseVideo(filePath) {
        try {
            logger_js_1.logger.info(`Starting video transcription for: ${filePath}`);
            const scriptPath = path_1.default.join(__dirname, 'whisper_video_service.py');
            const command = `python "${scriptPath}" "${filePath}"`;
            const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 1024 });
            if (stderr) {
                logger_js_1.logger.warn(`stderr from Python script: ${stderr}`);
            }
            const result = JSON.parse(stdout);
            return { text: result.text, language: 'english' };
        }
        catch (error) {
            logger_js_1.logger.error('Video transcription failed:', error);
            throw new Error(`Failed to parse video: ${error.message}`);
        }
    }
    /**
     * Optimize image for better OCR results
     */
    async optimizeImageForOCR(filePath) {
        try {
            const optimizedPath = filePath.replace(/\.[^/.]+$/, '_optimized.png');
            await (0, sharp_1.default)(filePath)
                .resize(null, 1000, {
                withoutEnlargement: true,
                fit: 'inside'
            })
                .greyscale()
                .normalize()
                .sharpen()
                .png({ quality: 100 })
                .toFile(optimizedPath);
            return optimizedPath;
        }
        catch (error) {
            logger_js_1.logger.warn(`Image optimization failed, using original: ${error}`);
            return filePath;
        }
    }
    /**
     * Process content based on type with language detection and translation
     */
    async processContent(content) {
        try {
            let extractedText;
            let language = 'english';
            let translatedText;
            switch (content.type) {
                case 'pdf':
                    if (!content.filePath)
                        throw new Error('File path required for PDF');
                    extractedText = await this.parsePDF(content.filePath);
                    // language = await this.ollamaService.detectLanguage(extractedText);
                    break;
                case 'image':
                    if (!content.filePath)
                        throw new Error('File path required for image');
                    extractedText = await this.parseImage(content.filePath);
                    // language = await this.ollamaService.detectLanguage(extractedText);
                    break;
                case 'youtube':
                    if (!content.url)
                        throw new Error('URL required for YouTube video');
                    const youtubeResult = await this.parseYouTube(content.url);
                    extractedText = youtubeResult.text;
                    language = youtubeResult.language;
                    break;
                case 'video':
                    if (!content.filePath)
                        throw new Error('File path required for video');
                    const videoResult = await this.parseVideo(content.filePath);
                    extractedText = videoResult.text;
                    language = videoResult.language;
                    break;
                default:
                    throw new Error(`Unsupported content type: ${content.type}`);
            }
            // Translate to English if not already in English
            // if (language !== 'english' && language !== 'en' && language !== 'unknown') {
            //   try {
            //     logger.info(`Translating content from ${language} to English`);
            //     translatedText = await this.ollamaService.translateToEnglish(extractedText, language);
            //   } catch (translationError) {
            //     logger.warn(`Translation failed, using original text: ${translationError}`);
            //     translatedText = extractedText;
            //   }
            // }
            return {
                success: true,
                contentId: content.id,
                extractedText,
                language,
                translatedText
            };
        }
        catch (error) {
            logger_js_1.logger.error(`Content processing failed for ${content.id}: ${error}`);
            return {
                success: false,
                contentId: content.id,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}
exports.ContentParserService = ContentParserService;
