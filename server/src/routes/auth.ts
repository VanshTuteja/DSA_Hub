import express from 'express';
import { User } from '../models/User.js';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth.js';
import { authValidation } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import crypto from 'crypto';
import { sendVerificationEmail, sendResetPasswordEmail, testEmailService, sendWelcomeEmail, sendResetSuccessEmail } from '../utils/emailService.js'; // Assuming you have email service
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

/**
 * Register new user
 */
router.post('/signup', async (req, res) => {
  try {
    const { error, value } = authValidation.register.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { username, email, password, firstName, lastName } = value;

    // Check if user already exists
    let existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (!existingUser.isVerified) {
        // Delete unverified user
        await User.deleteOne({ _id: existingUser._id });
      } else {
        // User is verified, return error
        return res.status(400).json({
          success: false,
          message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
        });
      }
    }

    // Generate verification token
    const verificationToken = generateVerificationCode();

    // Create new user
    const user = new User({
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
    const token = generateToken(user._id.toString());

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findById(user._id).select("-password");

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      user: {
        ...userWithoutPassword?.toObject(),
        id: user._id
      }
    });

  } catch (error) {
    logger.error('Registration error:', error);
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
    const user = await User.findOne({ email });
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
      }}
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
    const token = generateToken(user._id.toString());

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const userWithoutPassword = await User.findById(user._id).select("-password -verificationToken -resetPasswordToken");

    res.json({
      success: true,
      message: `Welcome back ${user.profile.firstName} ${user.profile.lastName}`,
      user: userWithoutPassword
    });

  } catch (error) {
    logger.error('Login error:', error);
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

    const user = await User.findOne({
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
    await sendWelcomeEmail(user.email, user.profile.firstName);

    const userWithoutPassword = await User.findById(user._id).select("-password -verificationToken -resetPasswordToken");

    res.json({
      success: true,
      message: 'Email verified successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
});

/**
 * Check authentication
 */
router.get('/check-auth', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = req.user!;
    const userWithoutPassword = await User.findById(user._id).select("-password -verificationToken -resetPasswordToken");

    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    logger.error('Auth check error:', error);
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send reset password email (implement this based on your email service)
    await sendResetPasswordEmail(user.email, resetToken);

    res.json({
      success: true,
      message: 'Password reset email sent'
    });

  } catch (error) {
    logger.error('Forgot password error:', error);
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

    const user = await User.findOne({
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
    await sendResetSuccessEmail(user.email);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed'
    });
  }
});

/**
 * Get current user profile
 */
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = req.user!;
    const userWithoutPassword = await User.findById(user._id).select("-password -verificationToken -resetPasswordToken");

    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    logger.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});
/**
 * Update user profile
 */
router.put('/profile/update', authenticateToken, async (req: AuthRequest, res) => {
  
  try {

    const userId = req.user!.id;
    const {
      firstName,
      lastName,
      contact,
      country,
      profilePicture,
      bio
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if(profilePicture == null){
      user.profile.profilePicture = "";
    }
    else{
    // Upload to Cloudinary only if it's a new image (e.g., base64 or data URL)
    let profilePicUrl = user.profile.profilePicture;
    if (profilePicture && profilePicture.startsWith('data:')) {
      const cloudResponse = await cloudinary.uploader.upload(profilePicture);
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

    const userWithoutPassword = await User.findById(userId)
      .select('-password -verificationToken -resetPasswordToken');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});


/**
 * Update user srick
 */
router.put('/profile/streak', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { streak, lastActivityDate } = req.body;

    if (!streak || !lastActivityDate) {
      return res.status(400).json({ success: false, message: "Missing streak or date" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.stats.streak = streak;
    user.stats.lastActivity = new Date(lastActivityDate);

    await user.save();

    const sanitizedUser = await User.findById(userId).select("-password -verificationToken -resetPasswordToken");

    return res.status(200).json({
      success: true,
      message: "Streak updated successfully",
      user: sanitizedUser
    });

  } catch (error) {
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
router.put('/change-password', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { error, value } = authValidation.changePassword.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { currentPassword, newPassword } = value;
    const user = req.user!;

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

  } catch (error) {
    logger.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

/**
 * Logout
 */
router.post('/logout', authenticateToken, async (req: AuthRequest, res) => {
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
  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

router.post('/analytics/session', authenticateToken, async (req: AuthRequest, res) => {
  const userId = req.user!._id;
  const { durationMs } = req.body;

  if (!durationMs || durationMs < 0) {
    return res.status(400).json({ success: false, message: 'Invalid duration' });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      $inc: { 'stats.totalTimeSpent': durationMs }
    });

    res.status(200).json({ success: true, message: 'Session time recorded.' });
  } catch (error) {
    console.error('Error saving session time:', error);
    res.status(500).json({ success: false, message: 'Failed to save session data' });
  }
});

router.get('/analytics/total-time', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!._id;

    const user = await User.findById(userId).select('stats.totalTimeSpent');
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
  } catch (err) {
    console.error('Error fetching total time:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch total time' });
  }
});



router.get('/test-email', async (req, res) => {
  try {
    const result = await testEmailService();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "err.message" });
  }
});


export default router;