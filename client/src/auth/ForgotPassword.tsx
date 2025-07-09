import React, { useState } from 'react';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from '@/store/useUserStore';

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onPasswordReset?: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  isOpen,
  setIsOpen,
  onPasswordReset,
  forgotPassword
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      emailSchema.parse({ email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await forgotPassword(email);
      
      if (onPasswordReset) {
        await onPasswordReset(email);
      } else {
        // Default behavior - just log for demo
        console.log('Password reset requested for:', email);
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after close animation
    setTimeout(() => {
      setEmail('');
      setError('');
      setSuccess(false);
      setLoading(false);
    }, 200);
  };

  const handleBackToLogin = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0">
        <div className="bg-white dark:bg-gray-900 overflow-auto max-w-lg max-h-[90vh]">
          <DialogHeader className="p-8 pb-0">
            <div className="text-center">
              {success ? (
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              )}
              
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {success ? 'Check Your Email' : 'Reset Password'}
              </DialogTitle>
              
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {success 
                  ? `We've sent a password reset link to ${email}`
                  : 'Enter your email address and we\'ll send you a link to reset your password'
                }
              </p>
            </div>
          </DialogHeader>

          <div className="p-8 pt-4">
            {success ? (
              // Success State
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      "Reset-password mail sent successfully.Check your mail to Reset Password"
                    </p>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setEmail('');
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 font-medium"
                  >
                    Try Another Email
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 focus:outline-none transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </button>
                </div>
              </div>
            ) : (
              // Form State
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      id="reset-email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Reset Link...</span>
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                {/* Back to Login */}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 focus:outline-none transition-colors duration-200"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;