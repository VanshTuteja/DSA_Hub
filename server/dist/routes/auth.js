"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_js_1 = require("../models/User.js");
const auth_js_1 = require("../middleware/auth.js");
const validation_js_1 = require("../utils/validation.js");
const logger_js_1 = require("../utils/logger.js");
const crypto_1 = __importDefault(require("crypto"));
const emailService_js_1 = require("../utils/emailService.js"); // Assuming you have email service
const generateVerificationCode_js_1 = require("../utils/generateVerificationCode.js");
const cloudinary_js_1 = __importDefault(require("../utils/cloudinary.js"));
const router = express_1.default.Router();
/**
 * Register new user
 */
router.post('/signup', async (req, res) => {
    try {
        const { error, value } = validation_js_1.authValidation.register.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const { username, email, password, firstName, lastName } = value;
        // Check if user already exists
        let existingUser = await User_js_1.User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            if (!existingUser.isVerified) {
                // Delete unverified user
                await User_js_1.User.deleteOne({ _id: existingUser._id });
            }
            else {
                // User is verified, return error
                return res.status(400).json({
                    success: false,
                    message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
                });
            }
        }
        // Generate verification token
        const verificationToken = (0, generateVerificationCode_js_1.generateVerificationCode)();
        // Create new user
        const user = new User_js_1.User({
            username,
            email,
            password,
            profile: {
                firstName,
                lastName,
            },
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            isVerified: false
        });
        await user.save();
        // Generate auth token
        const token = (0, auth_js_1.generateToken)(user._id.toString());
        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        // Send verification email
        await (0, emailService_js_1.sendVerificationEmail)(email, verificationToken);
        const userWithoutPassword = await User_js_1.User.findById(user._id).select("-password");
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                ...userWithoutPassword?.toObject(),
                id: user._id
            }
        });
    }
    catch (error) {
        logger_js_1.logger.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});
/**
 * Login user
 */
router.post('/login', async (req, res) => {
    try {
        // const { error, value } = authValidation.login.validate(req.body);
        // if (error) {
        //   return res.status(400).json({
        //     success: false,
        //     message: error.details[0].message
        //   });
        // }
        const { email, password } = req.body;
        // Find user by email
        const user = await User_js_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        if (user) {
            if (!user.isVerified) {
                return res.status(401).json({
                    success: false,
                    message: 'Email not exit.Please Signup!'
                });
            }
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // Update last activity and login
        user.lastLogin = new Date();
        await user.save();
        // Generate token
        const token = (0, auth_js_1.generateToken)(user._id.toString());
        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        const userWithoutPassword = await User_js_1.User.findById(user._id).select("-password -verificationToken -resetPasswordToken");
        res.json({
            success: true,
            message: `Welcome back ${user.profile.firstName} ${user.profile.lastName}`,
            user: userWithoutPassword
        });
    }
    catch (error) {
        logger_js_1.logger.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});
/**
 * Verify email
 */
router.post('/verify-email', async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await User_js_1.User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        // send welcome email
        await (0, emailService_js_1.sendWelcomeEmail)(user.email, user.profile.firstName);
        const userWithoutPassword = await User_js_1.User.findById(user._id).select("-password -verificationToken -resetPasswordToken");
        res.json({
            success: true,
            message: 'Email verified successfully',
            user: userWithoutPassword
        });
    }
    catch (error) {
        logger_js_1.logger.error('Email verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Email verification failed'
        });
    }
});
/**
 * Check authentication
 */
router.get('/check-auth', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        const userWithoutPassword = await User_js_1.User.findById(user._id).select("-password -verificationToken -resetPasswordToken");
        res.json({
            success: true,
            user: userWithoutPassword
        });
    }
    catch (error) {
        logger_js_1.logger.error('Auth check error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication check failed'
        });
    }
});
/**
 * Forgot password
 */
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_js_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
        await user.save();
        // Send reset password email (implement this based on your email service)
        await (0, emailService_js_1.sendResetPasswordEmail)(user.email, resetToken);
        res.json({
            success: true,
            message: 'Password reset email sent'
        });
    }
    catch (error) {
        logger_js_1.logger.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send reset email'
        });
    }
});
/**
 * Reset password
 */
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User_js_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        // send success reset email
        await (0, emailService_js_1.sendResetSuccessEmail)(user.email);
        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    }
    catch (error) {
        logger_js_1.logger.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Password reset failed'
        });
    }
});
/**
 * Get current user profile
 */
router.get('/profile', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        const userWithoutPassword = await User_js_1.User.findById(user._id).select("-password -verificationToken -resetPasswordToken");
        res.json({
            success: true,
            user: userWithoutPassword
        });
    }
    catch (error) {
        logger_js_1.logger.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        });
    }
});
/**
 * Update user profile
 */
router.put('/profile/update', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, contact, country, profilePicture, bio } = req.body;
        const user = await User_js_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (profilePicture == null) {
            user.profile.profilePicture = "";
        }
        else {
            // Upload to Cloudinary only if it's a new image (e.g., base64 or data URL)
            let profilePicUrl = user.profile.profilePicture;
            if (profilePicture && profilePicture.startsWith('data:')) {
                const cloudResponse = await cloudinary_js_1.default.uploader.upload(profilePicture);
                profilePicUrl = cloudResponse.secure_url;
            }
            user.profile.profilePicture = profilePicUrl;
        }
        user.profile.firstName = firstName;
        user.profile.lastName = lastName;
        user.profile.contact = contact;
        user.profile.country = country;
        user.profile.bio = bio;
        await user.save();
        const userWithoutPassword = await User_js_1.User.findById(userId)
            .select('-password -verificationToken -resetPasswordToken');
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: userWithoutPassword
        });
    }
    catch (error) {
        logger_js_1.logger.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
});
/**
 * Update user srick
 */
router.put('/profile/streak', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { streak, lastActivityDate } = req.body;
        if (!streak || !lastActivityDate) {
            return res.status(400).json({ success: false, message: "Missing streak or date" });
        }
        const user = await User_js_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.stats.streak = streak;
        user.stats.lastActivity = new Date(lastActivityDate);
        await user.save();
        const sanitizedUser = await User_js_1.User.findById(userId).select("-password -verificationToken -resetPasswordToken");
        return res.status(200).json({
            success: true,
            message: "Streak updated successfully",
            user: sanitizedUser
        });
    }
    catch (error) {
        console.error('Error updating streak:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
/**
 * Change password
 */
router.put('/change-password', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { error, value } = validation_js_1.authValidation.changePassword.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const { currentPassword, newPassword } = value;
        const user = req.user;
        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        // Update password
        user.password = newPassword;
        await user.save();
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    }
    catch (error) {
        logger_js_1.logger.error('Password change error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to change password'
        });
    }
});
/**
 * Logout
 */
router.post('/logout', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            });
        }
        // Update last activity timestamp
        user.stats.lastActivity = new Date();
        await user.save();
        // Clear the JWT cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            // secure: process.env.NODE_ENV === 'production', // enable in production
        });
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        logger_js_1.logger.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});
router.post('/analytics/session', auth_js_1.authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const { durationMs } = req.body;
    if (!durationMs || durationMs < 0) {
        return res.status(400).json({ success: false, message: 'Invalid duration' });
    }
    try {
        await User_js_1.User.findByIdAndUpdate(userId, {
            $inc: { 'stats.totalTimeSpent': durationMs }
        });
        res.status(200).json({ success: true, message: 'Session time recorded.' });
    }
    catch (error) {
        console.error('Error saving session time:', error);
        res.status(500).json({ success: false, message: 'Failed to save session data' });
    }
});
router.get('/analytics/total-time', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User_js_1.User.findById(userId).select('stats.totalTimeSpent');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const totalMs = user.stats.totalTimeSpent || 0;
        const totalHours = (totalMs / (1000 * 60 * 60)).toFixed(2);
        res.json({
            success: true,
            totalMs,
            totalHours,
            message: 'Total time fetched successfully'
        });
    }
    catch (err) {
        console.error('Error fetching total time:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch total time' });
    }
});
router.get('/test-email', async (req, res) => {
    try {
        const result = await (0, emailService_js_1.testEmailService)();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, message: "err.message" });
    }
});
exports.default = router;
