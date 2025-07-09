"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhisperService = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const index_js_1 = require("../config/index.js");
const logger_js_1 = require("../utils/logger.js");
class WhisperService {
    /**
     * Transcribe audio file using Whisper
     */
    async transcribe(audioPath, p0) {
        try {
            logger_js_1.logger.info(`Starting Whisper transcription for: ${audioPath}`);
            // Check if file exists
            await promises_1.default.access(audioPath);
            const result = await this.runWhisper(audioPath);
            logger_js_1.logger.info(`Whisper transcription completed. Text length: ${result.text.length}`);
            return result;
        }
        catch (error) {
            logger_js_1.logger.error(`Whisper transcription failed: ${error}`);
            throw new Error(`Failed to transcribe audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Run Whisper command
     */
    async runWhisper(audioPath) {
        return new Promise((resolve, reject) => {
            const outputDir = path_1.default.dirname(audioPath);
            const fileName = path_1.default.basename(audioPath, path_1.default.extname(audioPath));
            const args = [
                audioPath,
                '--model', index_js_1.config.whisper.model,
                '--language', index_js_1.config.whisper.language,
                '--output_dir', outputDir,
                '--output_format', 'json',
                '--verbose', 'False'
            ];
            logger_js_1.logger.info(`Running Whisper with args: ${args.join(' ')}`);
            const whisperProcess = (0, child_process_1.spawn)('whisper', args);
            let stderr = '';
            whisperProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            whisperProcess.on('close', async (code) => {
                if (code !== 0) {
                    reject(new Error(`Whisper process exited with code ${code}: ${stderr}`));
                    return;
                }
                try {
                    // Read the JSON output file
                    const jsonPath = path_1.default.join(outputDir, `${fileName}.json`);
                    const jsonContent = await promises_1.default.readFile(jsonPath, 'utf-8');
                    const result = JSON.parse(jsonContent);
                    // Clean up JSON file
                    await promises_1.default.unlink(jsonPath).catch(() => { });
                    resolve({
                        text: result.text || '',
                        language: result.language || 'unknown',
                        confidence: result.confidence
                    });
                }
                catch (error) {
                    reject(new Error(`Failed to read Whisper output: ${error}`));
                }
            });
            whisperProcess.on('error', (error) => {
                reject(new Error(`Failed to start Whisper process: ${error.message}`));
            });
        });
    }
    /**
     * Check if Whisper is installed and available
     */
    async checkAvailability() {
        return new Promise((resolve) => {
            const whisperProcess = (0, child_process_1.spawn)('whisper', ['--help']);
            whisperProcess.on('close', (code) => {
                resolve(code === 0);
            });
            whisperProcess.on('error', () => {
                resolve(false);
            });
        });
    }
}
exports.WhisperService = WhisperService;
