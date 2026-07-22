"use client";

import { signIn } from "@/lib/auth-client";
import React, { useState } from "react";
import toast from "react-hot-toast";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "Invalid credentials.");
        return;
      }
      toast.success("Login successful.");
     window.location.href = '/';
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signIn.email({
        email: process.env.NEXT_PUBLIC_EMAIL as string,
        password: process.env.NEXT_PUBLIC_EMAIL_PASS as string
      });

      if (error) {
        toast.error(error.message || "Demo login failed.");
        return;
      }
      toast.success("Logged in as Demo Admin.");
      window.location.href = '/';
    } catch (err) {
      setError("Demo login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto bg-surface border border-border p-8 rounded-2xl">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">[ AUTHENTICATION ]</p>
          <h2 className="font-serif italic text-3xl text-text">Welcome back.</h2>
          <p className="text-text2 text-xs mt-1">Enter your credentials to access the console.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] tracking-wider text-text2 uppercase block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-surface2/40 border border-border/80 rounded-xl px-4 py-3 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent transition-all font-sans"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-mono text-[11px] tracking-wider text-text2 uppercase block">
                Password
              </label>
              <a href="#" className="font-mono text-[10px] text-accent hover:underline">
                [ FORGOT? ]
              </a>
            </div>
            
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface2/40 border border-border/80 rounded-xl px-4 py-3 pr-12 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent transition-all font-sans"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-text3 hover:text-text transition-colors focus:outline-none p-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-xs text-accent font-mono mt-2">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 rounded-xl bg-text text-bg font-mono text-xs tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </>
            ) : (
              "[ SIGN IN ]"
            )}
          </button>

          {/* Direct Demo Login Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-xl border border-accent/20 text-accent font-mono text-xs tracking-wider uppercase hover:border-accent hover:bg-accent/5 transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? "Please wait..." : "[ Direct Demo Login ]"}
          </button>
        </form>
      </div>
    </div>
  );
}