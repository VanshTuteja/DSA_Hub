"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.optionalAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = require("../config/index.js");
const User_js_1 = require("../models/User.js");
const logger_js_1 = require("../utils/logger.js");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.split(' ')[1];
        const token = tokenFromHeader || req.cookies.token; // ✅ support cookie token too
        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, index_js_1.config.jwt.secret);
        const user = await User_js_1.User.findById(decoded.userId).select('+username +email');
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = user;
        // req.id = user.id;
        next();
    }
    catch (error) {
        logger_js_1.logger.error('Authentication error:', error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, index_js_1.config.jwt.secret);
            const user = await User_js_1.User.findById(decoded.userId).select('-password');
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        // Continue without authentication
        next();
    }
};
exports.optionalAuth = optionalAuth;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, index_js_1.config.jwt.secret, { expiresIn: "7d" }); //config.jwt.expiresIn
};
exports.generateToken = generateToken;
