'use client';

import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';
import { 
  ArrowRight, Cpu, ShieldCheck, Zap, MessageSquare, 
  Search, Workflow, HelpCircle, CheckCircle, ChevronRight
} from 'lucide-react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Deep Research Agents',
      desc: 'Orchestrate autonomous search processes that compile market analysis, competitor audits, and data validation sheets in minutes.',
      icon: Search,
      color: 'text-violet-500 bg-violet-500/10'
    },
    {
      title: 'Customer Support Networks',
      desc: 'Deploy 24/7 client-facing agents that safely interface with backend database systems to resolve complex booking and account queries.',
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Workflow Automation',
      desc: 'Seamlessly link email servers, slack threads, and enterprise ERPs with LLM decision chains that run error-free.',
      icon: Workflow,
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      title: 'Secure Hosting & Monitor',
      desc: 'Track latency, cost, prompt drifts, and execution trees in real-time through our unified observability dashboard.',
      icon: ShieldCheck,
      color: 'text-brand-500 bg-brand-500/10'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Background Glows */}
      <div className="relative overflow-hidden min-h-screen flex flex-col justify-between">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-700/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-800/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flow-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
          .animate-flow-right {
            animation: flow-right 2.5s infinite linear;
          }
          .animate-pulse-ring {
            animation: pulse-ring 3s infinite ease-in-out;
          }
        `}} />

        <div className="flex-grow pt-24 pb-20">
          {/* Hero */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
              Powerful Core Capabilities
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Explore how Aether AI's self-contained agent loops execute complex workflows and automate operations.
            </p>
          </section>

          {/* Interactive Workspace Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Vertical tabs list */}
              <div className="lg:col-span-2 flex flex-col space-y-4">
                {features.map((feat, index) => {
                  const Icon = feat.icon;
                  const isActive = activeFeature === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`p-6 rounded-2xl text-left transition-all duration-300 flex items-start space-x-4 border ${
                        isActive
                          ? 'bg-dark-900/60 border-brand-500/40 shadow-lg shadow-brand-900/10'
                          : 'bg-dark-950/20 border-dark-900 hover:border-dark-800 hover:bg-dark-900/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${feat.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-base sm:text-lg">{feat.title}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{feat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Simulation Panel */}
              <div className="lg:col-span-3 flex">
                <div className="w-full rounded-2xl glass-panel border-brand-500/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-dark-950/40 min-h-[360px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-dark-800/80 pb-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <span className="text-[10px] text-slate-500 font-mono pl-3">
                        {activeFeature === 0 && 'deep_research_node.py'}
                        {activeFeature === 1 && 'support_network.js'}
                        {activeFeature === 2 && 'workflow_trigger.yaml'}
                        {activeFeature === 3 && 'observability_metrics.go'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[10px] text-brand-400 font-semibold bg-brand-500/10 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
                      <span>SIMULATION ACTIVE</span>
                    </div>
                  </div>

                  {/* Simulator Body */}
                  <div className="flex-grow flex flex-col justify-center">
                    {activeFeature === 0 && (
                      <div className="space-y-4 font-mono text-xs">
                        <div className="flex items-center space-x-2 border-b border-dark-900 pb-3 text-slate-300">
                          <span className="text-violet-400">agent@aether:~$</span>
                          <span className="text-slate-100">run deep-research --topic "saas pricing"</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>Crawling web sources...</span>
                            <span className="text-violet-400 font-bold">85%</span>
                          </div>
                          <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-violet-500 to-brand-500 h-full rounded-full w-[85%] animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-2 text-[10px]">
                          <div className="flex items-center space-x-2 text-slate-300">
                            <span className="text-emerald-500">✓</span>
                            <span className="text-slate-400">Parsed Stripe Developer Docs</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-300">
                            <span className="text-emerald-500">✓</span>
                            <span className="text-slate-400">Scraped AWS EC2 Models</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-300">
                            <span className="text-emerald-500">✓</span>
                            <span className="text-slate-400">Parsed Crunchbase Competitors</span>
                          </div>
                        </div>
                        <div className="p-3 bg-dark-900/60 rounded-xl border border-dark-800/80 flex items-center justify-between text-[11px] text-slate-300">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-4 w-4 text-brand-400" />
                            <span className="font-semibold">pricing_audit.csv generated</span>
                          </div>
                          <span className="text-slate-500">Size: 4.2KB</span>
                        </div>
                      </div>
                    )}

                    {activeFeature === 1 && (
                      <div className="flex flex-col justify-between h-full space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-end">
                            <div className="bg-brand-600 text-white rounded-2xl rounded-tr-none px-3.5 py-1.5 text-xs max-w-[85%] shadow-sm">
                              How do I check my workspace usage statistics?
                            </div>
                          </div>
                          <div className="flex justify-start items-start space-x-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold text-[10px]">
                              AI
                            </div>
                            <div className="bg-dark-900 border border-dark-800 text-slate-200 rounded-2xl rounded-tl-none px-3.5 py-1.5 text-xs max-w-[85%]">
                              Workspace stats for <span className="text-emerald-400 font-mono">user@company.com</span>:
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-dark-950/80 border border-dark-800/60 rounded-xl font-mono text-[10px] space-y-1.5">
                          <div className="flex items-center justify-between text-slate-400 border-b border-dark-900 pb-1.5">
                            <span>Database Read Execution</span>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px]">SUCCESS</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-slate-300">
                            <span className="text-purple-400">SELECT</span>
                            <span>credits, api_calls</span>
                            <span className="text-purple-400">FROM</span>
                            <span>workspaces</span>
                            <span className="text-purple-400">WHERE</span>
                            <span>id = 'ws_002'</span>
                          </div>
                          <div className="text-slate-500 text-[9px] flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Returned row count: 1 (Execution Time: 12ms)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFeature === 2 && (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-full max-w-[340px] flex items-center justify-between">
                          {/* Node 1 */}
                          <div className="flex flex-col items-center space-y-1.5 z-10">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/5 hover:scale-105 transition-transform duration-300">
                              <Workflow className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Webhook Trigger</span>
                          </div>

                          {/* Connecting Line 1 */}
                          <div className="absolute left-[34px] right-[144px] top-5.5 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-violet-500 overflow-hidden">
                            <div className="h-full bg-white/80 w-16 animate-flow-right" />
                          </div>

                          {/* Central Node */}
                          <div className="flex flex-col items-center space-y-1.5 z-10">
                            <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500 flex items-center justify-center text-violet-400 shadow-lg shadow-violet-500/10 hover:rotate-12 transition-transform duration-300">
                              <Cpu className="h-6 w-6 text-violet-400 animate-pulse" />
                            </div>
                            <span className="text-[10px] font-mono text-white font-bold">Aether Agent</span>
                          </div>

                          {/* Connecting Line 2 */}
                          <div className="absolute left-[170px] right-[34px] top-5.5 h-0.5 bg-gradient-to-r from-violet-500 via-brand-500 to-brand-500 overflow-hidden">
                            <div className="h-full bg-white/80 w-16 animate-flow-right" />
                          </div>

                          {/* Node 3 */}
                          <div className="flex flex-col items-center space-y-1.5 z-10">
                            <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 shadow-md shadow-brand-500/5 hover:scale-105 transition-transform duration-300">
                              <MessageSquare className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Slack Dispatch</span>
                          </div>
                        </div>
                        <div className="mt-6 px-3 py-1 bg-dark-900 border border-dark-800 rounded-full flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
                          <span>Pipeline execution completed in 184ms</span>
                        </div>
                      </div>
                    )}

                    {activeFeature === 3 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-2 bg-dark-900 border border-dark-800 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Latency</span>
                            <span className="text-sm font-black text-white font-mono mt-0.5 block">24ms</span>
                          </div>
                          <div className="p-2 bg-dark-900 border border-dark-800 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Drift</span>
                            <span className="text-sm font-black text-emerald-400 font-mono mt-0.5 block">0.02%</span>
                          </div>
                          <div className="p-2 bg-dark-900 border border-dark-800 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Memory</span>
                            <span className="text-sm font-black text-violet-400 font-mono mt-0.5 block">142MB</span>
                          </div>
                        </div>
                        <div className="relative h-16 w-full bg-dark-900/40 rounded-xl border border-dark-800/80 overflow-hidden flex items-end">
                          <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path d="M0,80 Q25,30 50,45 T100,20 T150,55 T200,30 T250,45 T300,15 L300,80 L0,80 Z" fill="url(#chart-glow)" />
                            <path d="M0,80 Q25,30 50,45 T100,20 T150,55 T200,30 T250,45 T300,15" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <div className="absolute top-2 left-3 flex items-center space-x-1">
                            <span className="w-1 h-1 rounded-full bg-violet-400 animate-ping" />
                            <span className="text-[8px] font-mono text-slate-500">live_metrics_stream</span>
                          </div>
                        </div>
                        <div className="bg-dark-950/90 rounded-lg p-2.5 border border-dark-800/60 font-mono text-[9px] text-slate-400 space-y-1 h-[54px] overflow-hidden">
                          <div className="flex justify-between">
                            <span className="text-slate-500">[01:50:02]</span>
                            <span className="text-slate-300">Agent #023 active in us-east-1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">[01:50:05]</span>
                            <span className="text-slate-300">LLM tokens consumed: prompt=320 compl=62</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dashboard Footer */}
                  <div className="border-t border-dark-800/80 pt-4 mt-6 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-slate-600 animate-pulse-ring" />
                      <span>Interactive Agent Preview</span>
                    </div>
                    <Link href="/services" className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center space-x-1.5 transition-colors">
                      <span>Explore Architecture</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Core specs section at the bottom for additional context */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="border-t border-dark-900 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="text-white font-bold text-base mt-4">Enterprise Isolation</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every run executes within a secure container sandbox. Workspace data is strictly isolated to prevent prompt leakages.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Zap className="h-4 w-4" />
                </div>
                <h4 className="text-white font-bold text-base mt-4">Autonomous Reasoning</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Agents formulate self-healing sub-tasks, execute external REST APIs, and double-check logic loops recursively.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <h4 className="text-white font-bold text-base mt-4">Custom Integrations</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Quickly deploy custom system prompts and link webhooks to dispatch Slack notifications, Stripe actions, or database updates.
                </p>
              </div>
            </div>
          </section>

        </div>

        <Footer />
      </div>
    </>
  );
}
