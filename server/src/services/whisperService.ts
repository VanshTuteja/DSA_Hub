import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { TranscriptionResult } from '../types/index.js';

export class WhisperService {
  
  /**
   * Transcribe audio file using Whisper
   */
  async transcribe(audioPath: string, p0?: { language: string; task: string; }): Promise<TranscriptionResult> {
    try {
      logger.info(`Starting Whisper transcription for: ${audioPath}`);
      
      // Check if file exists
      await fs.access(audioPath);
      
      const result = await this.runWhisper(audioPath);
      
      logger.info(`Whisper transcription completed. Text length: ${result.text.length}`);
      
      return result;
      
    } catch (error) {
      logger.error(`Whisper transcription failed: ${error}`);
      throw new Error(`Failed to transcribe audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Run Whisper command
   */
  private async runWhisper(audioPath: string): Promise<TranscriptionResult> {
    return new Promise((resolve, reject) => {
      const outputDir = path.dirname(audioPath);
      const fileName = path.basename(audioPath, path.extname(audioPath));
      
      const args = [
        audioPath,
        '--model', config.whisper.model,
        '--language', config.whisper.language,
        '--output_dir', outputDir,
        '--output_format', 'json',
        '--verbose', 'False'
      ];

      logger.info(`Running Whisper with args: ${args.join(' ')}`);

      const whisperProcess = spawn('whisper', args);
      
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
          const jsonPath = path.join(outputDir, `${fileName}.json`);
          const jsonContent = await fs.readFile(jsonPath, 'utf-8');
          const result = JSON.parse(jsonContent);
          
          // Clean up JSON file
          await fs.unlink(jsonPath).catch(() => {});
          
          resolve({
            text: result.text || '',
            language: result.language || 'unknown',
            confidence: result.confidence
          });
          
        } catch (error) {
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
  async checkAvailability(): Promise<boolean> {
    return new Promise((resolve) => {
      const whisperProcess = spawn('whisper', ['--help']);
      
      whisperProcess.on('close', (code) => {
        resolve(code === 0);
      });
      
      whisperProcess.on('error', () => {
        resolve(false);
      });
    });
  }
}