'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Radio,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/roles');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-dark-900/80 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Moving Satellite & Mesh Visuals */}
        <div className="relative p-8 lg:p-12 bg-gradient-to-br from-electric-950 via-dark-900 to-violet-950 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-[90px] animate-pulse-slow" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-[90px]" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-electric-500/20 border border-electric-500/30 text-cyan-400">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-white text-lg">VillageConnect AI</h2>
              <p className="text-xs text-gray-400">Secure Digital Infrastructure Gateway</p>
            </div>
          </div>

          {/* Center Satellite Graphic */}
          <div className="relative z-10 my-12 text-center space-y-6">
            <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-tr from-electric-500/20 to-violet-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Radio className="w-16 h-16 text-cyan-400 animate-pulse" />
              <span className="absolute inset-0 rounded-full border border-electric-400/30 animate-ping" />
            </div>
            <div className="space-y-2">
              <h3 className="font-poppins font-bold text-2xl text-white">Hybrid Mesh Authentication</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                Connect seamlessly with Firebase Authentication & offline IndexedDB session token caching.
              </p>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>256-Bit Encrypted Offline Session Vault Active</span>
          </div>
        </div>

        {/* Right Side: Glass Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-dark-900/60">
          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-dark-800 p-1 border border-white/10">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 rounded-lg text-xs font-poppins font-bold transition-all ${
                tab === 'signin' ? 'bg-electric-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 rounded-lg text-xs font-poppins font-bold transition-all ${
                tab === 'signup' ? 'bg-electric-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Header text */}
          <div>
            <h3 className="font-poppins font-bold text-2xl text-white mb-1">
              {tab === 'signin' ? 'Welcome Back' : 'Join VillageConnect AI'}
            </h3>
            <p className="text-xs text-gray-400">
              {tab === 'signin' ? 'Enter your credentials to access your rural dashboard' : 'Register to connect with local health, emergency & education services'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Email Address or Aadhaar ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@villageconnect.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-300">Password</label>
                {tab === 'signin' && (
                  <button type="button" className="text-[11px] text-cyan-400 hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {tab === 'signin' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-dark-800 border-white/20 text-electric-500 focus:ring-0"
                />
                <label htmlFor="remember" className="text-xs text-gray-300">
                  Remember session offline on this device
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-600 via-cyan-500 to-violet-600 text-white font-poppins font-bold text-sm shadow-lg shadow-electric-500/25 hover:shadow-electric-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSuccess ? (
                <span className="flex items-center gap-2 text-emerald-300">
                  <ShieldCheck className="w-5 h-5 animate-bounce" /> Authenticated! Redirecting...
                </span>
              ) : isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <span className="flex items-center gap-2">
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Social / Demo Button */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setIsSuccess(true);
                setTimeout(() => router.push('/roles'), 800);
              }}
              className="w-full py-2.5 rounded-xl bg-dark-800 border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <span>🌐 Continue with Google Single Sign-On</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
