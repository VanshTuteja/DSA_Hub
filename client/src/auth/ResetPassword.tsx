import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    setLoading(true);
    await resetPassword(token, newPassword);
    setLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-400' };
    if (password.length < 8) return { strength: 'medium', color: 'bg-yellow-400' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 'strong', color: 'bg-green-400' };
    }
    return { strength: 'medium', color: 'bg-yellow-400' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="w-full max-w-md mx-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-white/20 rounded-full p-3">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
            <p className="text-center text-orange-100 mt-2">
              Create a new secure password for your account
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200 text-gray-900 bg-white"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: passwordStrength.strength === 'weak' ? '33%' : 
                                   passwordStrength.strength === 'medium' ? '66%' : '100%'
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength === 'weak' ? 'text-red-500' :
                        passwordStrength.strength === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                      </span>
                    </div>

                    {/* Password Requirements */}
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-xs ${
                        newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <CheckCircle className={`h-3 w-3 ${
                          newPassword.length >= 6 ? 'text-green-500' : 'text-gray-300'
                        }`} />
                        At least 6 characters
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${
                        newPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <CheckCircle className={`h-3 w-3 ${
                          newPassword.length >= 8 ? 'text-green-500' : 'text-gray-300'
                        }`} />
                        At least 8 characters (recommended)
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${
                        /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <CheckCircle className={`h-3 w-3 ${
                          /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-300'
                        }`} />
                        Contains uppercase letter and number
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !newPassword || newPassword.trim().length < 6}
                onClick={handleSubmit}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Reset Password
                  </>
                )}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center pt-4">
                <span className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link 
                    to="/" 
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 hover:underline"
                  >
                    Back to Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-1">
              <Lock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Security Tips</h3>
              <p className="text-xs text-blue-600 mt-1">
                Choose a strong password with a mix of letters, numbers, and symbols. 
                Avoid using personal information or common words.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;