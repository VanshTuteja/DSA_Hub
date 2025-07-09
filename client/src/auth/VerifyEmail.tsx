import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmailVerificationDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  email: string;
  onVerifySuccess: () => void;
  onGoBack: () => void;
  loading?: boolean;
  verifyEmail: (verificationCode: string) => Promise<void>;
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({
  isOpen,
  setIsOpen,
  email,
  onVerifySuccess,
  onGoBack,
  loading = false,
  verifyEmail
}) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Focus first input when dialog opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setVerificationCode(newCode.slice(0, 6));
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Use the actual verifyEmail function from the store
      await verifyEmail(code);
      
      // If successful, call onVerifySuccess
      onVerifySuccess();

    } catch (error: any) {
      // Show specific error message and keep dialog open
      setError(error.message || 'Invalid or expired verification code');
      
      // Clear the form and focus first input
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Simulate API call for resending code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(60); // 60 second countdown
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.slice(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      setVerificationCode(['', '', '', '', '', '']);
      setIsOpen(false)}}>
      <DialogContent className="sm:max-w-md p-0">
        <div className="bg-white dark:bg-gray-900 overflow-auto max-w-lg max-h-[90vh]">
          <DialogHeader className="p-8 pb-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Verify Your Email
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {maskEmail(email)}
              </p>
            </div>
          </DialogHeader>

          <div className="p-8 pt-4">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Verification Code Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => {inputRefs.current[index] = el}}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    disabled={isVerifying || loading}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isVerifying || loading || verificationCode.join('').length !== 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium mb-4"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Verify Email</span>
                </div>
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center mb-6">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Didn't receive the code?{' '}
              </span>
              <button
                onClick={handleResendCode}
                disabled={isResending || resendTimer > 0}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : resendTimer > 0 ? (
                  `Resend in ${resendTimer}s`
                ) : (
                  'Resend Code'
                )}
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={()=>{
                setVerificationCode(['', '', '', '', '', '']);
                onGoBack();}}
              disabled={isVerifying || loading}
              className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 focus:outline-none transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign Up</span>
            </button>

            {/* Help Text */}
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Check your spam folder if you don't see the email.</p>
              <p className="mt-1">The code expires in 10 minutes.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialog;