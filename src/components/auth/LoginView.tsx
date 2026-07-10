"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "In what city were you born?",
  "What was the name of your first school?",
  "What is your favorite food?",
];

export function LoginView() {
  const loginUser = useAppStore((s) => s.loginUser);
  const setSettings = useAppStore((s) => s.setSettings);
  const setProgress = useAppStore((s) => s.setProgress);
  const setScores = useAppStore((s) => s.setScores);
  const navigate = useAppStore((s) => s.navigate);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
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

  // Auto-fill username if changed in login
  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgot(false);
    setForgotStep(1);
  };

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
      
      if (data.user.isAdmin) {
        toast.success("Logged in as Administrator");
        useAppStore.getState().setAdminAuth(password);
        loginUser(data.user);
        navigate("admin");
      } else {
        toast.success(`Welcome back, ${data.user.name}!`);
        // Auto cache the name instantly locally
        try {
          localStorage.setItem(`__studentName:${data.user.username}`, data.user.name);
        } catch {}
        loginUser(data.user);
        await fetchUserData();
      }
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

      // Auto cache the name instantly locally
      try {
        localStorage.setItem(`__studentName:${data.user.username}`, data.user.name);
      } catch {}

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
      setIsForgot(false);
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
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 select-none overflow-hidden">
      {/* ── Animated gradient background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b35 30%, #0a1628 55%, #0d0a1e 80%, #050510 100%)",
        }}
      />

      {/* ── Animated mesh grid overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glowing orbs ── */}
      <div
        aria-hidden="true"
        className="absolute -z-10 pointer-events-none"
        style={{
          top: "10%", left: "8%",
          width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "orb1 8s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 pointer-events-none"
        style={{
          bottom: "8%", right: "6%",
          width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "orb2 10s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 pointer-events-none"
        style={{
          top: "55%", left: "50%", transform: "translate(-50%,-50%)",
          width: 500, height: 200,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(14,165,233,0.09) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Floating code snippets ── */}
      {[
        { text: "print('Hello, World!')", top: "12%", left: "3%", delay: "0s",  dur: "14s" },
        { text: "for i in range(10):",   top: "22%", right: "4%", delay: "2s",  dur: "17s" },
        { text: "import numpy as np",    top: "65%", left: "2%",  delay: "4s",  dur: "13s" },
        { text: "model.fit(X, y)",       top: "75%", right: "3%", delay: "1s",  dur: "16s" },
        { text: "def train(epochs=10):", top: "42%", left: "1%",  delay: "3s",  dur: "18s" },
        { text: "llm.predict(prompt)",   top: "48%", right: "2%", delay: "5s",  dur: "15s" },
        { text: "loss.backward()",       top: "85%", left: "12%", delay: "6s",  dur: "12s" },
        { text: "x = torch.tensor([])",  top: "8%",  right:"12%", delay: "1.5s",dur: "19s" },
      ].map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute font-mono text-[11px] pointer-events-none hidden lg:block"
          style={{
            top: s.top,
            left: (s as any).left,
            right: (s as any).right,
            color: "rgba(147,197,253,0.25)",
            animation: `floatCode ${s.dur} ease-in-out ${s.delay} infinite alternate`,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {s.text}
        </div>
      ))}

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes orb1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.15); }
        }
        @keyframes orb2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-35px, -25px) scale(1.12); }
        }
        @keyframes floatCode {
          from { opacity: 0.18; transform: translateY(0px); }
          to   { opacity: 0.35; transform: translateY(-18px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.92); opacity: 0.6; }
          50%  { transform: scale(1.05); opacity: 0.25; }
          100% { transform: scale(0.92); opacity: 0.6; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Preserve the 3-D flip card */
        .flip-card-container { perspective: 1000px; }
        .flip-card-inner {
          position: relative;
          width: 330px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-inner.flipped { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back { transform: rotateY(180deg); }
      `}</style>

      {/* ── Premium branding header ── */}
      <div
        className="flex flex-col items-center gap-2 mb-8 text-center"
        style={{ animation: "fadeSlideDown 0.7s ease both" }}
      >
        {/* Icon badge */}
        <div className="relative mb-1">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)",
              animation: "pulse-ring 3s ease-in-out infinite",
            }}
          />
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-2xl text-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.25) 100%)",
              border: "1px solid rgba(99,179,237,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            🐍
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #e2e8f0 0%, #93c5fd 40%, #c4b5fd 70%, #e2e8f0 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s linear infinite",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Python &amp; AI
        </h1>

        {/* Subtitle row */}
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase"
             style={{ color: "rgba(147,197,253,0.6)" }}>
            Interactive Handbook
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-2 mt-1">
          {["Python", "Machine Learning", "LLMs"].map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(99,179,237,0.2)",
                color: "rgba(147,197,253,0.7)",
                letterSpacing: "0.08em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Login panel (flip card — completely unchanged) ── */}
      <div
        className="flip-card-container w-[330px] min-h-[490px] relative flex justify-center items-center"
        style={{ animation: "fadeSlideDown 0.9s ease 0.1s both" }}
      >
        <div className={cn("flip-card-inner w-full flex flex-col justify-center", isSignUp && "flipped")}>

          
          {/* FRONT CARD: Log In or Password Reset */}
          <div className="flip-card-front bg-card p-6 rounded-md border-2 border-foreground shadow-[5px_5px_0px_0px_var(--foreground)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.15)] flex flex-col gap-4">
            
            {/* Header toggle links */}
            <div className="flex justify-between items-center text-xs font-bold border-b border-border/80 pb-3">
              <button
                type="button"
                onClick={() => setIsForgot(false)}
                className={cn("text-muted-foreground transition-all hover:text-foreground", !isForgot && "text-primary underline decoration-2 underline-offset-4")}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign Up
              </button>
            </div>

            {!isForgot ? (
              /* LOG IN FORM */
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Username</Label>
                  <Input
                    type="text"
                    placeholder="Enter unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1 relative">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 pr-10 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all font-semibold"
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
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-[#2d8cf0] hover:bg-[#1b71d4] border-2 border-foreground text-white font-bold tracking-wide shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all text-sm mt-3"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "LET'S GO!"}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setIsForgot(true);
                    setForgotStep(1);
                  }}
                  className="w-full text-center text-xs font-bold text-[#2d8cf0] dark:text-[#52a6ff] hover:underline pt-2"
                >
                  Forgot Password?
                </button>
              </form>
            ) : (
              /* PASSWORD RESET / RECOVERY FORM */
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 justify-center mb-1 text-center">
                  <Shield className="h-5 w-5 text-[#2d8cf0]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-foreground">Password Recovery</span>
                </div>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotLookup} className="flex flex-col gap-4">
                    <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                      Enter your username to fetch your challenge questions.
                    </p>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">Username</Label>
                      <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-10 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 bg-foreground text-background border-2 border-foreground font-bold shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all text-xs"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "FETCH CHALLENGE"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="flex flex-col gap-3.5">
                    <div className="p-3 bg-accent/50 border-2 border-foreground rounded text-xs text-foreground font-semibold leading-relaxed">
                      <span className="text-primary block mb-0.5 uppercase text-[10px]">Challenge Question:</span>
                      {retrievedQuestion}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">Your Answer</Label>
                      <Input
                        type="text"
                        placeholder="Type answer here"
                        value={resetAnswer}
                        onChange={(e) => setResetAnswer(e.target.value)}
                        className="h-10 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">New Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-10 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 bg-[#2d8cf0] hover:bg-[#1b71d4] border-2 border-foreground text-white font-bold shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all text-xs"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "RESET PASSWORD"}
                    </Button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground hover:underline"
                >
                  Back to Log In
                </button>
              </div>
            )}

          </div>

          {/* BACK CARD: Sign Up */}
          <div className="flip-card-back bg-card p-6 rounded-md border-2 border-foreground shadow-[5px_5px_0px_0px_var(--foreground)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.15)] flex flex-col gap-4">
            
            {/* Header toggle links */}
            <div className="flex justify-between items-center text-xs font-bold border-b border-border/80 pb-3">
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-muted-foreground hover:text-foreground"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setIsForgot(false);
                }}
                className="text-primary underline decoration-2 underline-offset-4"
              >
                Sign Up
              </button>
            </div>

            {/* SIGN UP FORM */}
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <div className="space-y-0.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Username</Label>
                <Input
                  type="text"
                  placeholder="Unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-9 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold text-xs"
                  required
                />
              </div>

              <div className="space-y-0.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold text-xs"
                  required
                />
              </div>

              <div className="space-y-0.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-9 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold text-xs"
                  required
                />
              </div>

              <div className="space-y-0.5">
                <Label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Security Question</Label>
                <select
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  className="w-full h-9 px-3 bg-accent/40 border-2 border-foreground rounded text-xs font-semibold outline-none text-foreground shadow-[2px_2px_0px_0px_var(--foreground)]"
                >
                  {SECURITY_QUESTIONS.map((q, idx) => (
                    <option key={idx} value={q} className="bg-card text-foreground text-xs">
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-0.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Answer</Label>
                <Input
                  type="text"
                  placeholder="Your Answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="h-9 bg-accent/40 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)] font-semibold text-xs"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#2d8cf0] hover:bg-[#1b71d4] border-2 border-foreground text-white font-bold shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all text-xs mt-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "CONFIRM!"}
              </Button>
            </form>

          </div>

        </div>
      </div>

      {/* ── Footer below card ── */}
      <div
        className="mt-6 flex flex-col items-center gap-2"
        style={{ animation: "fadeSlideDown 1.1s ease 0.2s both" }}
      >
        <p className="text-[10px] font-medium" style={{ color: "rgba(147,197,253,0.35)" }}>
          Learn Python &amp; AI — one day at a time 🚀
        </p>
        <div className="flex items-center gap-3">
          {[
            { label: "48 Days", icon: "📅" },
            { label: "Quizzes", icon: "🧠" },
            { label: "Notebooks", icon: "📓" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-1">
              <span className="text-[10px]">{f.icon}</span>
              <span className="text-[9px] font-semibold" style={{ color: "rgba(147,197,253,0.4)" }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
