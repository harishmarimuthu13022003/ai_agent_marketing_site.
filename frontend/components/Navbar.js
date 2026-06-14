'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '../lib/api';
import { Menu, X, Cpu, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check auth status on mount and path changes
    const currentUser = api.auth.getCurrentUser();
    setUser(currentUser);
  }, [pathname]);

  const handleLogout = () => {
    api.auth.logout();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark-950/75 backdrop-blur-md border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
              <Cpu className="h-8 w-8 text-brand-500 animate-pulse" />
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-400 bg-clip-text text-transparent">
                Aether AI
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-brand-400 ${
                    isActive ? 'text-brand-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1.5 px-4 h-9 bg-dark-900 border border-dark-700 hover:bg-dark-800 rounded-lg text-sm font-medium text-slate-200 transition-all duration-200"
                >
                  <LayoutDashboard className="h-4 w-4 text-brand-400" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-4 h-9 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 hover:border-red-800 rounded-lg text-sm font-medium text-red-200 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-1 px-4 h-9 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1 text-slate-400" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 h-9 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 rounded-lg text-sm font-medium text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-brand-900/20 hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-dark-900 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-950 border-b border-dark-800 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-dark-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-dark-800 pt-3 flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-dark-900 border border-dark-700 hover:bg-dark-800 rounded-lg text-slate-200 font-medium text-base transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5 text-brand-400" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 rounded-lg text-red-200 font-medium text-base transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-dark-900 text-base font-medium transition-colors"
                >
                  <LogIn className="h-5 w-5 text-slate-400" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 rounded-lg text-base font-medium text-white flex items-center justify-center transition-colors shadow-md shadow-brand-900/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
