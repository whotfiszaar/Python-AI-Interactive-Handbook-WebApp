"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "In what city were you born?",
  "What was the name of your first school?",
  "What is your favorite food?",
];

type ActiveForm = "login" | "signup" | "forgot";

export function LoginView() {
  const loginUser = useAppStore((s) => s.loginUser);
  const setSettings = useAppStore((s) => s.setSettings);
  const setProgress = useAppStore((s) => s.setProgress);
  const setScores = useAppStore((s) => s.setScores);

  const [activeForm, setActiveForm] = useState<ActiveForm>("login");
  const [loading, setLoading] = useState(false);

  // Field states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password flow states
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [retrievedQuestion, setRetrievedQuestion] = useState("");
  const [resetAnswer, setResetAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Helpers to fetch user settings after login/signup
  const fetchUserData = async () => {
    try {
      const [progressRes, scoresRes, settingsRes] = await Promise.all([
        fetch("/api/progress", { cache: "no-store" }),
        fetch("/api/assessments", { cache: "no-store" }),
        fetch("/api/settings", { cache: "no-store" }),
      ]);
      if (progressRes.ok) setProgress(await progressRes.json());
      if (scoresRes.ok) setScores(await scoresRes.json());
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        setSettings(data);
        if (data.fontSize) {
          document.documentElement.style.fontSize = `${data.fontSize}px`;
        }
      }
    } catch (e) {
      console.error("Failed to load user data:", e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Login failed");
        return;
      }
      toast.success(`Welcome back, ${data.user.name}!`);
      loginUser(data.user);
      await fetchUserData();
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password || !name.trim() || !securityAnswer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          name,
          securityQuestion,
          securityAnswer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Sign up failed");
        return;
      }
      toast.success("Account created successfully!");
      loginUser(data.user);
      await fetchUserData();
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Please enter your username");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/reset-password?username=${encodeURIComponent(username)}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "User lookup failed");
        return;
      }
      setRetrievedQuestion(data.securityQuestion);
      setForgotStep(2);
    } catch {
      toast.error("Could not fetch security details");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetAnswer.trim() || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          answer: resetAnswer,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Password reset failed");
        return;
      }
      toast.success("Password reset successfully! You can now log in.");
      setActiveForm("login");
      setForgotStep(1);
      setPassword("");
      setResetAnswer("");
      setNewPassword("");
    } catch {
      toast.error("An error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-background select-none">
      <div className="w-full max-w-[350px] space-y-4">
        
        {/* Main Card (Insta Style) */}
        <Card className="border border-border/80 bg-card p-8 flex flex-col items-center shadow-sm">
          {/* Logo / Header */}
          <div className="flex flex-col items-center gap-1.5 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight font-serif italic text-foreground text-center">
              Python & AI
            </h1>
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Interactive Handbook
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeForm === "login" && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleLogin}
                className="w-full space-y-4"
              >
                <div className="space-y-1.5">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
                    required
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm pr-10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm transition-colors mt-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
                </Button>

                {/* Separation Line */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-3 text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                    OR
                  </span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveForm("forgot");
                    setForgotStep(1);
                  }}
                  className="w-full text-center text-xs font-semibold text-sky-800 dark:text-sky-400 hover:underline"
                >
                  Forgot password?
                </button>
              </motion.form>
            )}

            {activeForm === "signup" && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleSignup}
                className="w-full space-y-3.5"
              >
                <p className="text-center text-xs text-muted-foreground font-semibold px-4 mb-2">
                  Sign up to track your AI coding progress and complete assessments.
                </p>

                <div className="space-y-1">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1 relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Security Question Selector */}
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase pl-1">
                    Security Question (For Password Reset)
                  </Label>
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full h-10 px-3 bg-accent/40 border border-border/60 rounded-md text-sm outline-none text-foreground"
                  >
                    {SECURITY_QUESTIONS.map((q, idx) => (
                      <option key={idx} value={q} className="bg-card text-foreground">
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Input
                    type="text"
                    placeholder="Security Answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="h-10 bg-accent/40 border-border/60 text-sm"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm transition-colors mt-3"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign up"}
                </Button>
              </motion.form>
            )}

            {activeForm === "forgot" && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="w-full space-y-4"
              >
                <div className="flex justify-center mb-1">
                  <Shield className="h-12 w-12 text-muted-foreground/80" />
                </div>
                <h2 className="text-center font-semibold text-sm text-foreground">
                  Trouble Logging In?
                </h2>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotLookup} className="space-y-4">
                    <p className="text-center text-xs text-muted-foreground px-1 leading-relaxed">
                      Enter your username and we will fetch your security challenge question.
                    </p>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-10 bg-accent/40 border-border/60 text-sm"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full h-10 bg-primary text-primary-foreground font-semibold text-sm transition-colors"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Fetch Challenge"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="p-3.5 bg-accent/40 border border-border/40 rounded-md text-xs text-foreground/90 font-medium">
                      <span className="font-semibold text-sky-600 dark:text-sky-400 block mb-1">
                        Challenge Question:
                      </span>
                      {retrievedQuestion}
                    </div>

                    <div className="space-y-1">
                      <Input
                        type="text"
                        placeholder="Your Answer"
                        value={resetAnswer}
                        onChange={(e) => setResetAnswer(e.target.value)}
                        className="h-10 bg-accent/40 border-border/60 text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-10 bg-accent/40 border-border/60 text-sm"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm transition-colors"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
                    </Button>
                  </form>
                )}

                <div className="flex items-center my-2">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-3 text-[10px] font-semibold text-muted-foreground uppercase">
                    OR
                  </span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveForm("login");
                    setForgotStep(1);
                  }}
                  className="w-full text-center text-xs font-semibold text-sky-800 dark:text-sky-400 hover:underline"
                >
                  Back to Log In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Footer Toggle Card */}
        <Card className="border border-border/80 bg-card p-5 flex justify-center text-sm shadow-sm">
          {activeForm === "login" ? (
            <div className="text-xs font-medium text-foreground">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setActiveForm("signup");
                  setUsername("");
                  setPassword("");
                }}
                className="font-semibold text-[#0095f6] hover:underline"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="text-xs font-medium text-foreground">
              Have an account?{" "}
              <button
                onClick={() => {
                  setActiveForm("login");
                  setUsername("");
                  setPassword("");
                }}
                className="font-semibold text-[#0095f6] hover:underline"
              >
                Log in
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
