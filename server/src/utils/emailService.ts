import nodemailer from 'nodemailer';
import { logger } from './logger.js';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your app password
  },
};

// Create reusable transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    logger.error('Email service configuration error:', error);
  } else {
    logger.info('Email service is ready to send messages');
  }
});

// Common email styles
const getEmailStyles = () => `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      background-color: #f7fafc;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
      pointer-events: none;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      position: relative;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.9;
      position: relative;
    }
    
    .content {
      padding: 40px 30px;
      background: white;
    }
    
    .content h2 {
      font-size: 24px;
      color: #2d3748;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .content p {
      font-size: 16px;
      margin-bottom: 16px;
      color: #4a5568;
    }
    
    .verification-code {
      display: inline-block;
      padding: 24px 32px;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border: 2px solid #667eea;
      color: #2d3748;
      text-decoration: none;
      border-radius: 12px;
      margin: 24px 0;
      font-weight: 700;
      font-size: 32px;
      letter-spacing: 8px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transition: all 0.3s ease;
    }
    
    .button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      margin: 24px 0;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }
    
    .button-success {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    }
    
    .button-danger {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
      box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
    }
    
    .code-container {
      text-align: center;
      margin: 32px 0;
      padding: 24px;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .alert {
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid;
    }
    
    .alert-warning {
      background: linear-gradient(135deg, #fffbeb 0%, #fef5e7 100%);
      border-left-color: #f6ad55;
      color: #744210;
    }
    
    .alert-info {
      background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
      border-left-color: #4299e1;
      color: #2a69ac;
    }
    
    .alert-success {
      background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
      border-left-color: #48bb78;
      color: #22543d;
    }
    
    .footer {
      text-align: center;
      padding: 32px 30px;
      background: #f8f9fa;
      border-top: 1px solid #e9ecef;
      color: #6c757d;
      font-size: 14px;
    }
    
    .footer p {
      margin-bottom: 8px;
    }
    
    .feature-list {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 24px;
      border-radius: 8px;
      margin: 24px 0;
      border: 1px solid #dee2e6;
    }
    
    .feature-list h3 {
      color: #2d3748;
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 600;
    }
    
    .feature-list ul {
      list-style: none;
      padding: 0;
    }
    
    .feature-list li {
      padding: 8px 0;
      font-size: 15px;
      color: #4a5568;
      position: relative;
      padding-left: 24px;
    }
    
    .feature-list li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #48bb78;
      font-weight: bold;
    }
    
    .link-box {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      word-break: break-all;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-size: 14px;
      color: #495057;
      margin: 16px 0;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
      margin: 32px 0;
    }
    
    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .verification-code {
        font-size: 24px;
        letter-spacing: 4px;
        padding: 20px 24px;
      }
      
      .button {
        padding: 14px 24px;
        font-size: 15px;
      }
    }
  </style>
`;

/**
 * Send verification email
 */
export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  try {
    const mailOptions = {
      from: {
        name: process.env.FROM_NAME || 'Your App Name',
        address: process.env.SMTP_USER || 'noreply@yourapp.com',
      },
      to: email,
      subject: 'Verify Your Email Address 🔐',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          ${getEmailStyles()}
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🔐 Verify Your Email</h1>
              <p>Please verify your email address to get started</p>
            </div>
            
            <div class="content">
              <h2>Welcome aboard! 👋</h2>
              <p>Thank you for signing up! To complete your registration and start using our platform, please enter the verification code below:</p>
              
              <div class="code-container">
                <div class="verification-code">${verificationToken}</div>
                <p style="margin-top: 16px; font-weight: 600; color: #667eea;">
                  Enter this 6-digit code to verify your email address
                </p>
              </div>
              
              <div class="alert alert-warning">
                <strong>⏰ Time Sensitive:</strong> This verification code will expire in 24 hours for security reasons.
              </div>
              
              <div class="divider"></div>
              
              <p style="color: #6c757d;">If you didn't create an account with us, please ignore this email.</p>
            </div>
            
            <div class="footer">
              <p><strong>${process.env.FROM_NAME || 'Your App Name'}</strong></p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Our Platform!
        
        Thank you for signing up! To complete your registration, please enter the following verification code:
        
        Verification Code: ${verificationToken}
        
        This verification code will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
        
        Best regards,
        ${process.env.FROM_NAME || 'Your App Name'} Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Send password reset email
 */
export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: {
        name: process.env.FROM_NAME || 'Your App Name',
        address: process.env.SMTP_USER || 'noreply@yourapp.com',
      },
      to: email,
      subject: 'Reset Your Password 🔑',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          ${getEmailStyles()}
        </head>
        <body>
          <div class="email-container">
            <div class="header" style="background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);">
              <h1>🔑 Password Reset</h1>
              <p>We received a request to reset your password</p>
            </div>
            
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>You recently requested to reset your password. Click the button below to create a new password:</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" class="button button-danger">Reset Password</a>
              </div>
              
              <div class="divider"></div>
              
              <p><strong>Alternative method:</strong></p>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <div class="link-box">
                ${resetUrl}
              </div>
              
              <div class="alert alert-warning">
                <strong>⏰ Time Sensitive:</strong> This password reset link will expire in 1 hour for security reasons.
              </div>
              
              <div class="alert alert-info">
                <strong>🛡️ Security Note:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure.
              </div>
              
              <p style="color: #6c757d;">For your security, this link can only be used once. If you need to reset your password again, you'll need to make a new request.</p>
            </div>
            
            <div class="footer">
              <p><strong>${process.env.FROM_NAME || 'Your App Name'}</strong></p>
              <p>If you have any questions about your account security, please contact our support team immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request
        
        You recently requested to reset your password. Visit the following link to create a new password:
        ${resetUrl}
        
        This password reset link will expire in 1 hour for security reasons.
        
        If you didn't request this password reset, please ignore this email. Your account remains secure.
        
        Best regards,
        ${process.env.FROM_NAME || 'Your App Name'} Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Send password reset success email
 */
export const sendResetSuccessEmail = async (email: string, firstName?: string) => {
  try {
    const mailOptions = {
      from: {
        name: process.env.FROM_NAME || 'Your App Name',
        address: process.env.SMTP_USER || 'noreply@yourapp.com',
      },
      to: email,
      subject: 'Password Successfully Reset ✅',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Successful</title>
          ${getEmailStyles()}
        </head>
        <body>
          <div class="email-container">
            <div class="header" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
              <h1>✅ Password Reset Successful</h1>
              <p>Your password has been successfully updated</p>
            </div>
            
            <div class="content">
              <h2>All Set${firstName ? `, ${firstName}` : ''}! 🎉</h2>
              <p>Your password has been successfully reset. You can now sign in to your account with your new password.</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${process.env.FRONTEND_URL}/login" class="button button-success">Sign In Now</a>
              </div>
              
              <div class="alert alert-success">
                <strong>✅ Security Confirmed:</strong> Your account is now secured with your new password.
              </div>
              
              <div class="divider"></div>
              
              <div class="feature-list">
                <h3>🔐 Security Recommendations:</h3>
                <ul>
                  <li>Use a strong, unique password</li>
                  <li>Enable two-factor authentication if available</li>
                  <li>Never share your password with anyone</li>
                  <li>Sign out from public or shared devices</li>
                  <li>Monitor your account for unusual activity</li>
                </ul>
              </div>
              
              <div class="alert alert-info">
                <strong>🚨 Didn't Reset Your Password?</strong> If you didn't reset your password, please contact our support team immediately at <strong>support@${process.env.SMTP_USER?.split('@')[1] || 'yourapp.com'}</strong>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>${process.env.FROM_NAME || 'Your App Name'}</strong></p>
              <p>Your security is our priority. If you have any concerns, please contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Successful
        
        ${firstName ? `Hi ${firstName},` : 'Hi there,'}
        
        Your password has been successfully reset. You can now sign in to your account with your new password.
        
        Sign in: ${process.env.FRONTEND_URL}/login
        
        Security Recommendations:
        - Use a strong, unique password
        - Enable two-factor authentication if available
        - Never share your password with anyone
        - Sign out from public or shared devices
        - Monitor your account for unusual activity
        
        If you didn't reset your password, please contact our support team immediately.
        
        Best regards,
        ${process.env.FROM_NAME || 'Your App Name'} Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Password reset success email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending password reset success email:', error);
    throw new Error('Failed to send password reset success email');
  }
};

/**
 * Send welcome email after successful verification
 */
export const sendWelcomeEmail = async (email: string, firstName: string) => {
  try {
    const mailOptions = {
      from: {
        name: process.env.FROM_NAME || 'Your App Name',
        address: process.env.SMTP_USER || 'noreply@yourapp.com',
      },
      to: email,
      subject: `Welcome to ${process.env.FROM_NAME || 'Your App Name'}, ${firstName}! 🎉`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome!</title>
          ${getEmailStyles()}
        </head>
        <body>
          <div class="email-container">
            <div class="header" style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);">
              <h1>🎉 Welcome ${firstName}!</h1>
              <p>Your account is now verified and ready to use</p>
            </div>
            
            <div class="content">
              <h2>Thanks for joining us! 🚀</h2>
              <p>We're excited to have you on board. Your email has been verified and your account is now fully activated.</p>
              
              <div class="feature-list">
                <h3>🌟 What you can do now:</h3>
                <ul>
                  <li>Complete your profile and personalize your experience</li>
                  <li>Take your first quiz and test your knowledge</li>
                  <li>Track your progress with detailed analytics</li>
                  <li>Earn achievements and unlock new features</li>
                  <li>Connect with other learners in the community</li>
                  <li>Access premium content and resources</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Get Started</a>
              </div>
              
              <div class="divider"></div>
              
              <div class="alert alert-info">
                <strong>💡 Pro Tip:</strong> Complete your profile to get personalized recommendations and better learning experience!
              </div>
              
              <p style="color: #6c757d;">If you have any questions or need help getting started, don't hesitate to reach out to our support team. We're here to help you succeed!</p>
            </div>
            
            <div class="footer">
              <p><strong>Welcome to ${process.env.FROM_NAME || 'Your App Name'}!</strong></p>
              <p>We're here to help you succeed on your learning journey.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome ${firstName}!
        
        Thanks for joining us! Your email has been verified and your account is now fully activated.
        
        What you can do now:
        - Complete your profile and personalize your experience
        - Take your first quiz and test your knowledge
        - Track your progress with detailed analytics
        - Earn achievements and unlock new features
        - Connect with other learners in the community
        - Access premium content and resources
        
        Get started: ${process.env.FRONTEND_URL}/dashboard
        
        If you have any questions, feel free to contact our support team.
        
        Welcome to ${process.env.FROM_NAME || 'Your App Name'}!
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

/**
 * Test email service
 */
export const testEmailService = async () => {
  try {
    const testMail = {
      from: {
        name: process.env.FROM_NAME || 'Your App Name',
        address: process.env.SMTP_USER || 'noreply@yourapp.com',
      },
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Email Service Test ✅',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Service Test</title>
          ${getEmailStyles()}
        </head>
        <body>
          <div class="email-container">
            <div class="header" style="background: linear-gradient(135deg, #9f7aea 0%, #805ad5 100%);">
              <h1>✅ Email Service Test</h1>
              <p>Testing email functionality</p>
            </div>
            
            <div class="content">
              <h2>Test Successful! 🎉</h2>
              <p>Your email service is working perfectly. All systems are operational and ready to send emails.</p>
              
              <div class="alert alert-success">
                <strong>✅ Status:</strong> Email service is functioning correctly.
              </div>
              
              <div class="feature-list">
                <h3>📧 Email Features Available:</h3>
                <ul>
                  <li>Email verification system</li>
                  <li>Password reset functionality</li>
                  <li>Welcome email automation</li>
                  <li>Password reset success notifications</li>
                  <li>HTML and plain text support</li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>${process.env.FROM_NAME || 'Your App Name'}</strong></p>
              <p>Email service test completed successfully.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Email Service Test
        
        Your email service is working perfectly! All systems are operational and ready to send emails.
        
        Email Features Available:
        - Email verification system
        - Password reset functionality  
        - Welcome email automation
        - Password reset success notifications
        - HTML and plain text support
        
        Test completed successfully.
        
        ${process.env.FROM_NAME || 'Your App Name'} Team
      `,
    };

    const info = await transporter.sendMail(testMail);
    logger.info('Test email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email service test failed:', error);
    throw new Error('Email service test failed');
  }
};