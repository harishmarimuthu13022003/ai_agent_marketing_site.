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



        <p className="text-center text-xs text-slate-400 mt-6">
          New to the system?{' '}
          <Link href="/register" className="text-brand-400 hover:underline font-medium">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
