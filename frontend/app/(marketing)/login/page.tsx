'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { api } from '../../../lib/api';
import { LogIn, Cpu, AlertCircle, RefreshCw } from 'lucide-react';

const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Please add a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated, direct to dashboard
    if (api.auth.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
    } catch (err: any) {
      setError(err.errors ? err.errors.join(', ') : err.message);
      return;
    }

    setLoading(true);

    try {
      await api.auth.login(email, password);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedMessage('');
    setError('');
    try {
      const data = await api.auth.seed();
      setSeedMessage(data.message || 'Database successfully seeded with demo accounts.');
      // Autofill admin user
      setEmail('admin@aether.ai');
      setPassword('admin123');
    } catch (err) {
      setError(err.message || 'Seeding failed. Try again.');
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-700/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-md p-8 rounded-2xl glass-panel border border-brand-500/10 shadow-2xl">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
            <Cpu className="h-6 w-6 text-brand-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Log in to Aether AI</h2>
          <p className="text-slate-400 text-sm text-center">
            Deploy, monitor, and scale custom business intelligence agent loops.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-900/50 flex items-start space-x-3 text-red-200 text-sm">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {seedMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex items-start space-x-3 text-emerald-200 text-sm">
            <AlertCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5 rotate-180" />
            <span>{seedMessage}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dev@aether.ai"
              className="w-full bg-dark-900 border border-dark-850 hover:border-dark-750 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-dark-900 border border-dark-850 hover:border-dark-750 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-brand-900/20 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div className="flex items-center space-x-2 my-6">
          <div className="flex-1 h-[1px] bg-dark-800" />
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Sandbox & Testing
          </span>
          <div className="flex-1 h-[1px] bg-dark-800" />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-dark-900/40 rounded-xl p-3 border border-dark-850">
            <div>
              <h4 className="text-xs font-bold text-white">Live Seeding Action</h4>
              <p className="text-[9px] text-slate-400">Instantly seed test users & agents.</p>
            </div>
            <button
              type="button"
              onClick={handleSeed}
              disabled={seedLoading}
              className="px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 font-semibold rounded-lg text-xs transition-colors border border-brand-500/20 flex items-center space-x-1"
            >
              {seedLoading ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Seeding...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3" />
                  <span>Seed DB</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setEmail('admin@aether.ai');
                setPassword('admin123');
              }}
              className="p-3 rounded-xl border border-dark-850 bg-dark-900/20 text-left hover:border-brand-500/30 hover:bg-dark-900/40 transition-all group"
            >
              <span className="block text-[9px] font-bold uppercase tracking-wider text-brand-400 group-hover:text-brand-300">
                Administrator
              </span>
              <span className="block text-xs font-semibold text-white mt-1">
                admin@aether.ai
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">
                PW: <code className="text-slate-400 bg-dark-950 px-1 py-0.5 rounded">admin123</code>
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('user@aether.ai');
                setPassword('user123');
              }}
              className="p-3 rounded-xl border border-dark-850 bg-dark-900/20 text-left hover:border-brand-500/30 hover:bg-dark-900/40 transition-all group"
            >
              <span className="block text-[9px] font-bold uppercase tracking-wider text-brand-400 group-hover:text-brand-300">
                Standard User
              </span>
              <span className="block text-xs font-semibold text-white mt-1">
                user@aether.ai
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">
                PW: <code className="text-slate-400 bg-dark-950 px-1 py-0.5 rounded">user123</code>
              </span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500 text-center">
            Click on a credential card to autofill.
          </p>
        </div>

        <p className="text-center text-xs text-slate-400">
          New to the system?{' '}
          <Link href="/register" className="text-brand-400 hover:underline font-medium">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
