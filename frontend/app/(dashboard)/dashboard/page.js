'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { Cpu, Users, LineChart, Shield, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function DashboardOverview() {
  const [user, setUser] = useState(null);
  const [agentCount, setAgentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = api.auth.getCurrentUser();
    setUser(currentUser);

    // Fetch agents to count them
    const fetchAgents = async () => {
      try {
        const res = await api.agents.getAll();
        setAgentCount(res.data ? res.data.length : 0);
      } catch (err) {
        console.error('Failed to load agents for counter', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  const stats = [
    { name: 'Active Agents', value: loading ? '-' : agentCount, icon: Cpu, color: 'text-brand-400' },
    { name: 'Avg. API Latency', value: '24ms', icon: LineChart, color: 'text-violet-400' },
    { name: 'Pipeline success', value: '99.8%', icon: Zap, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Greetings Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, {user?.name || 'Developer'}</h1>
          <p className="text-slate-400 text-sm mt-1">Here is a status summary of your Aether AI workspace.</p>
        </div>
        <div>
          <Link
            href="/dashboard/agents"
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 rounded-lg text-sm font-semibold text-white flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Configure AI Agents</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-xl glass-panel flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.name}</p>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-dark-900 border border-dark-850 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Observability Panel Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl glass-panel space-y-6">
          <h3 className="text-lg font-bold text-white">Platform Observability Log</h3>
          <div className="space-y-4 font-mono text-xs text-slate-400">
            <div className="flex items-center justify-between border-b border-dark-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300">scheduler_daemon</span>
              </div>
              <span>Database synced successfully</span>
              <span className="text-slate-500">Just now</span>
            </div>
            <div className="flex items-center justify-between border-b border-dark-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-300">auth_gate</span>
              </div>
              <span>Admin log session approved</span>
              <span className="text-slate-500">3 mins ago</span>
            </div>
            <div className="flex items-center justify-between border-b border-dark-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-300">agent_support_01</span>
              </div>
              <span>Triggered Slack webhook payload</span>
              <span className="text-slate-500">12 mins ago</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-panel flex flex-col justify-between border-brand-500/10">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">System Shield Active</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              All agent execution steps conform strictly to the configured data model validation constraints.
            </p>
          </div>
          <div className="pt-6 border-t border-dark-900 mt-4">
            <span className="text-[10px] text-slate-500 font-mono">Workspace ID: {user?.id || 'demo_id'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
