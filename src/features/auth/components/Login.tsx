import { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    navigate("/");
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="relative hidden lg:flex lg:flex-col lg:justify-center lg:bg-gradient-to-br lg:from-[#F5B041] lg:to-[#D4941F] lg:p-12">
          <div className="relative z-10">
            <div className="mb-8 flex items-center space-x-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B0F19]/20 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">GoldTrack</span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white">
              Track Your Gold
              <br />
              Investments
            </h1>
            <p className="mb-12 text-xl text-white/90">
              Monitor real-time gold prices, manage your portfolio, and make informed investment decisions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">Real-Time Tracking</h3>
                  <p className="text-white/80">Live gold prices from global and Vietnam markets</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">Portfolio Management</h3>
                  <p className="text-white/80">Track your gold holdings and profit/loss</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <span className="text-xl">🔔</span>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">Price Alerts</h3>
                  <p className="text-white/80">Get notified when prices reach your targets</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center space-x-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5B041] to-[#D4941F]">
                <TrendingUp className="h-6 w-6 text-[#0B0F19]" />
              </div>
              <span className="bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-2xl font-bold text-transparent">
                GoldTrack
              </span>
            </div>

            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[#94A3B8]">
                {isLogin
                  ? "Sign in to access your gold portfolio"
                  : "Start tracking your gold investments today"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-[#1E293B] bg-[#121826] text-white placeholder:text-[#94A3B8]"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="border-[#1E293B] bg-[#121826] pr-10 text-white placeholder:text-[#94A3B8]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="border-[#1E293B] bg-[#121826] text-white placeholder:text-[#94A3B8]"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Remember Me (Login only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                      className="h-4 w-4 rounded border-[#1E293B] bg-[#121826] text-[#F5B041]"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-[#94A3B8]">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm text-[#F5B041] hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              {/* Toggle Login/Register */}
              <div className="text-center">
                <span className="text-[#94A3B8]">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-[#F5B041] hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-[#1E293B]" />
              <span className="px-4 text-sm text-[#94A3B8]">or continue with</span>
              <div className="flex-1 border-t border-[#1E293B]" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-[#1E293B] bg-[#121826] hover:bg-[#1E293B]"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-[#1E293B] bg-[#121826] hover:bg-[#1E293B]"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
