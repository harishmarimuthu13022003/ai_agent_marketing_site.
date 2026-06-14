'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { api } from '../../../lib/api';
import { Cpu, UserPlus, AlertCircle, RefreshCw } from 'lucide-react';

const registerSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().email('Please add a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['user', 'admin']).required('Role is required')
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (api.auth.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations with Yup schema
    try {
      await registerSchema.validate({ name, email, password, role }, { abortEarly: false });
    } catch (err: any) {
      setError(err.errors ? err.errors.join(', ') : err.message);
      return;
    }

    setLoading(true);

    try {
      await api.auth.register(name, email, password, role);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
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
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Create your Account</h2>
          <p className="text-slate-400 text-sm text-center">
            Instantly set up workspace access to manage custom agents.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-900/50 flex items-start space-x-3 text-red-200 text-sm">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}



        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Dev"
              className="w-full bg-dark-900 border border-dark-850 hover:border-dark-750 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
            />
          </div>

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

          <div>
            <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
              Account Role (For Demo Testing)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  role === 'user'
                    ? 'border-brand-500 bg-brand-500/10 text-white'
                    : 'border-dark-800 bg-dark-900/40 text-slate-400 hover:border-dark-700'
                }`}
              >
                Standard User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  role === 'admin'
                    ? 'border-brand-500 bg-brand-500/10 text-white'
                    : 'border-dark-800 bg-dark-900/40 text-slate-400 hover:border-dark-700'
                }`}
              >
                Administrator
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              Select Administrator to access admin-gated user logs.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-brand-900/20 flex items-center justify-center space-x-2 mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </>
            )}
          </button>
        </form>



        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-400 hover:underline font-medium">
            Log In here
          </Link>
        </p>
      </div>
    </div>
  );
}
