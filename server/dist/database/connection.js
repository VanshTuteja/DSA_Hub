"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("../config/index.js");
const logger_js_1 = require("../utils/logger.js");
class DatabaseConnection {
    constructor() {
        this.isConnected = false;
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        if (this.isConnected) {
            logger_js_1.logger.info('Database already connected');
            return;
        }
        try {
            const mongoUri = index_js_1.config.nodeEnv === 'test' ? index_js_1.config.mongodb.testUri : index_js_1.config.mongodb.uri;
            await mongoose_1.default.connect(mongoUri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                // bufferMaxEntries: 0
            });
            this.isConnected = true;
            logger_js_1.logger.info(`Connected to MongoDB: ${mongoUri}`);
            // Handle connection events
            mongoose_1.default.connection.on('error', (error) => {
                logger_js_1.logger.error('MongoDB connection error:', error);
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('disconnected', () => {
                logger_js_1.logger.warn('MongoDB disconnected');
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('reconnected', () => {
                logger_js_1.logger.info('MongoDB reconnected');
                this.isConnected = true;
            });
            // Graceful shutdown
            process.on('SIGINT', async () => {
                await this.disconnect();
                process.exit(0);
            });
        }
        catch (error) {
            logger_js_1.logger.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await mongoose_1.default.connection.close();
            this.isConnected = false;
            logger_js_1.logger.info('Disconnected from MongoDB');
        }
        catch (error) {
            logger_js_1.logger.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
    getConnectionStatus() {
        return this.isConnected && mongoose_1.default.connection.readyState === 1;
    }
    async healthCheck() {
        try {
            const adminDb = mongoose_1.default.connection.db?.admin();
            const result = await adminDb?.ping();
            return {
                status: 'healthy',
                details: {
                    connected: this.isConnected,
                    readyState: mongoose_1.default.connection.readyState,
                    host: mongoose_1.default.connection.host,
                    port: mongoose_1.default.connection.port,
                    name: mongoose_1.default.connection.name,
                    ping: result
                }
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                details: {
                    connected: this.isConnected,
                    readyState: mongoose_1.default.connection.readyState,
                    error: error instanceof Error ? error.message : 'Unknown error'
                }
            };
        }
    }
}
exports.dbConnection = DatabaseConnection.getInstance();
