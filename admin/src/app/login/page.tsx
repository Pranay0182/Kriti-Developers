"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please verify your credentials.");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-[#0b1528]/80 border border-amber-400/25 rounded-3xl p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white tracking-tight">Portal Authentication</h2>
        <p className="text-xs text-slate-400 mt-1 font-light">
          Enter your executive credentials to manage projects, enquiries, and media assets.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">!</span>
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Admin User ID / Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c69c6d] focus:ring-1 focus:ring-[#c69c6d] transition"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Admin Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              autoComplete="current-password"
              className="w-full pl-10 pr-11 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c69c6d] focus:ring-1 focus:ring-[#c69c6d] transition font-mono tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-[#d8b082] via-[#c69c6d] to-[#b38553] hover:brightness-105 active:scale-[0.99] text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-[0.16em] transition-all shadow-[0_10px_25px_rgba(198,156,109,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050b14] text-white relative overflow-hidden px-4 sm:px-6">
      {/* Background ambient gold luxury glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(198,156,109,0.15)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[radial-gradient(circle,_rgba(198,156,109,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[radial-gradient(circle,_rgba(15,23,42,0.8)_0%,_transparent_70%)] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900/90 border border-amber-400/30 shadow-[0_0_35px_rgba(198,156,109,0.2)] mb-4">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" className="text-[#c69c6d]" stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="8" strokeWidth="2.5" className="text-[#c69c6d]/30" />
              <path d="M32 26v48" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M32 50l28-24" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M44 40l20 34" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M42 74h24" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            KRITI <span className="text-[#c69c6d]">DEVELOPERS</span>
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-[#dfba8e] text-[10px] font-bold tracking-[0.2em] uppercase mt-2">
            <ShieldCheck className="w-3 h-3 text-[#c69c6d]" />
            <span>Executive Admin Portal</span>
          </div>
        </div>

        {/* Card Body wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="backdrop-blur-xl bg-[#0b1528]/80 border border-amber-400/25 rounded-3xl p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#c69c6d] animate-spin mb-3" />
              <p className="text-xs text-slate-400 uppercase tracking-widest">Loading Portal...</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Security Badge Footer */}
        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c69c6d]" />
          <span>256-Bit Encrypted Session • Authorized Personnel Only</span>
        </div>
      </div>
    </div>
  );
}
