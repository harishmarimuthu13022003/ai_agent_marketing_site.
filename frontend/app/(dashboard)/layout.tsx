'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { api, User } from '../../lib/api';
import { 
  Cpu, LayoutDashboard, Settings, Users, LogOut, 
  Menu, X, RefreshCw, ChevronRight, UserCheck 
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Authenticate routing
    if (!api.auth.isAuthenticated()) {
      router.push('/login');
    } else {
      // Load current user profile from storage or endpoint
      const currentUser = api.auth.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    api.auth.logout();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="h-8 w-8 text-brand-500 animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Verifying authorization credentials...</p>
      </div>
    );
  }

  const menuItems: MenuItem[] = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Agents', href: '/dashboard/agents', icon: Cpu },
  ];

  // If user is admin, add user management
  if (user && user.role === 'admin') {
    menuItems.push({ name: 'Users Auditing', href: '/dashboard/users', icon: Users });
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-950 border-r border-dark-900 justify-between">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-dark-900">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Cpu className="h-7 w-7 text-brand-500" />
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-brand-400 bg-clip-text text-transparent">
                Aether AI
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-grow">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600/10 text-brand-400 border border-brand-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-dark-900/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-dark-900 space-y-3">
          <div className="flex items-center space-x-3 p-2 bg-dark-900/30 rounded-xl border border-dark-850">
            <div className="w-9 h-9 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-white text-xs font-semibold truncate leading-none">{user?.name}</h4>
              <p className="text-slate-400 text-[10px] truncate leading-none mt-1">{user?.email}</p>
              <span className="inline-flex mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-brand-500/10 text-brand-400 uppercase tracking-wider">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/50 rounded-lg text-red-300 font-medium text-xs transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar for Mobile Nav Toggling */}
        <header className="h-16 bg-dark-950 border-b border-dark-900 flex items-center justify-between px-6 md:justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-900 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-medium bg-dark-900 border border-dark-850 px-3 py-1.5 rounded-lg">
              <UserCheck className="h-3.5 w-3.5 text-brand-400" />
              <span>Signed in as: <strong className="text-slate-300">{user?.role}</strong></span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Modal Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-dark-950/80 backdrop-blur-sm">
            <div className="w-64 bg-dark-950 border-r border-dark-900 flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="h-16 flex items-center justify-between px-6 border-b border-dark-900">
                  <div className="flex items-center space-x-2 text-white">
                    <Cpu className="h-7 w-7 text-brand-500" />
                    <span className="text-lg font-bold tracking-tight">Aether AI</span>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-900"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="p-4 space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-brand-600/10 text-brand-400 border border-brand-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-dark-900/40 border border-transparent'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t border-dark-900 space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-dark-900/30 rounded-xl border border-dark-850">
                  <div className="w-9 h-9 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400 font-bold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">{user?.name}</h4>
                    <p className="text-slate-400 text-[10px]">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 bg-red-950/20 border border-red-900/40 rounded-lg text-red-300 font-medium text-xs"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout Session</span>
                </button>
              </div>
            </div>
            {/* Click outside sidebar to close */}
            <div className="flex-grow" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
