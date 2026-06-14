'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Cpu, ShieldCheck, Zap, Activity, MessageSquare, 
  Search, Workflow, HelpCircle, CheckCircle, ChevronDown, Star 
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const logos = [
    { name: 'Apex Corp', icon: Activity },
    { name: 'Vortex Labs', icon: Zap },
    { name: 'Aegis Sec', icon: ShieldCheck },
    { name: 'Synapse Inc', icon: Cpu },
  ];

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

  const useCases = [
    {
      role: 'Enterprise Operations',
      quote: 'Aether AI automated 70% of our daily invoice routing. The agents are self-healing and handle edge-cases perfectly.',
      client: 'Sarah Jenkins, COO at Apex'
    },
    {
      role: 'SaaS Engineering Team',
      quote: 'We replaced our manual user moderation queues with an automated research agent. The latency and accuracy are phenomenal.',
      client: 'Marcus Vance, VP of Engineering at Synapse'
    }
  ];

  const faqs = [
    {
      q: "What makes Aether AI agents different from standard chatbots?",
      a: "Standard chatbots follow static logic templates or simple chat loops. Aether AI agents are autonomous; they analyze instructions, plan multiple steps, call external APIs, inspect database records, and double-check their own work before returning a final outcome."
    },
    {
      q: "Is our business data safe with Aether AI?",
      a: "Absolutely. We enforce TLS 1.3 encryption in transit and AES-256 encryption at rest. We support complete workspace isolation, role-based database authentication, and do not use your proprietary business records for foundation model training."
    },
    {
      q: "How does billing work for custom agents?",
      a: "Our pricing structure is hybrid: a fixed monthly retainer for agent hosting/observability and a usage-based credit consumption model directly tied to the token counts consumed during execution."
    },
    {
      q: "Can standard users deploy custom prompts?",
      a: "Yes. In the auth dashboard, standard users can create, configure, update, and manage their own list of AI agents, while administrators maintain global control over auditing, user roles, and platform settings."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-700/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>Next-Generation AI Orchestration</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.05]">
            AI agents that <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              actually get work done.
            </span>
          </h1>
          <p className="text-slate-400/90 text-lg sm:text-xl md:text-xl/relaxed max-w-2xl font-medium">
            Move beyond simple prompt-and-response chatbots. Deploy autonomous AI agent networks that research, integrate, and execute complex business workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 shadow-lg shadow-brand-900/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-3.5 bg-dark-900 border border-dark-800 hover:bg-dark-800 rounded-xl font-semibold text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Visual Mockup with floating elements */}
        <div className="mt-16 lg:mt-0 relative flex justify-center">
          <div className="w-full max-w-[500px] h-[360px] rounded-2xl glass-panel relative p-6 flex flex-col justify-between shadow-2xl border-brand-500/10 overflow-hidden">
            {/* Design elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-transparent opacity-60" />
            <div className="flex items-center justify-between border-b border-dark-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-slate-500 font-mono pl-4">agent_scheduler.json</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-brand-400 font-semibold bg-brand-500/10 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
                <span>ACTIVE</span>
              </div>
            </div>

            <div className="flex-grow py-6 flex flex-col justify-center space-y-4 font-mono text-xs">
              <div className="flex items-start space-x-2">
                <span className="text-brand-500">&gt;</span>
                <p className="text-slate-300"><span className="text-violet-400">Initialize</span> custom_research_agent...</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-brand-500">&gt;</span>
                <p className="text-slate-300">Searching web endpoints for <span className="text-emerald-400">competitor API payloads</span></p>
              </div>
              <div className="flex items-start space-x-2 pl-4 border-l border-brand-500/20">
                <span className="text-slate-500">✓</span>
                <p className="text-slate-400">Gathered 14 references in 1.4 seconds</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-brand-500">&gt;</span>
                <p className="text-slate-300">Compiling Markdown spreadsheet audit...</p>
              </div>
            </div>

            <div className="border-t border-dark-800 pt-4 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-slate-500" />
                <span>System load: 12%</span>
              </div>
              <span>API Latency: 24ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="bg-dark-950/40 border-y border-dark-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-xs uppercase tracking-wider font-semibold mb-6">
            Trusted by fast-scaling engineering teams
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center">
            {logos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div key={index} className="flex items-center space-x-2 text-slate-500 hover:text-slate-400 transition-colors">
                  <Icon className="h-5 w-5 text-slate-600" />
                  <span className="font-semibold tracking-wider text-sm">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Supercharge Operations with Autonomous Workforces
          </h2>
          <p className="text-slate-400/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Aether AI supplies you with self-contained agent loops configured for distinct business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          {/* Left: Tab selection */}
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

          {/* Right: Dynamic Agent Simulator Dashboard */}
          <div className="lg:col-span-3 flex">
            <div className="w-full rounded-2xl glass-panel border-brand-500/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-dark-950/40 min-h-[340px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-dark-800/80 pb-4 mb-5">
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

              {/* Dynamic Body */}
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

              {/* Footer */}
              <div className="border-t border-dark-800/80 pt-4 mt-5 flex items-center justify-between text-[11px] text-slate-500">
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

      {/* Stats Proof / Testimonial Section */}
      <section className="bg-dark-900/30 border-y border-dark-900/80 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Stats */}
            <div className="space-y-6 lg:col-span-1">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">The Impact in Numbers</h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Aether AI delivers enterprise efficiency improvements that directly compound bottom-line margins.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-black text-brand-400 tracking-tight">99.8%</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 font-semibold uppercase tracking-wider">Uptime SLA Gated</p>
                </div>
                <div>
                  <h4 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-black text-violet-400 tracking-tight">10x+</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 font-semibold uppercase tracking-wider">Operations Speedup</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((use, index) => (
                <div key={index} className="p-6 rounded-xl glass-panel relative flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed">
                      "{use.quote}"
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-white font-semibold text-sm">{use.client}</p>
                    <p className="text-brand-400 text-xs uppercase font-bold tracking-wider mt-1">{use.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">Tailored for Any Scale</h2>
          <p className="text-slate-400/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Start completely free to prototype your agents. Upgrade seamlessly as execution usage scales.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="p-8 rounded-2xl glass-panel flex flex-col justify-between text-left">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xl tracking-tight">Developer</h3>
              <p className="text-slate-400 text-sm">For local testing and agent prototyping.</p>
              <div className="pt-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$0</span>
                <span className="text-slate-400 text-sm ml-1">/month</span>
              </div>
              <ul className="space-y-3 pt-6 text-sm text-slate-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>Up to 3 active agents</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>100 credit calls / mo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>Local database sync</span>
                </li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 w-full py-2.5 bg-dark-900 hover:bg-dark-800 text-white rounded-lg text-sm font-semibold text-center transition-colors">
              Get Prototyping
            </Link>
          </div>

          {/* Plan 2 */}
          <div className="p-8 rounded-2xl glass-panel border-brand-500/30 flex flex-col justify-between text-left relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-brand-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xl tracking-tight">Growth</h3>
              <p className="text-slate-400 text-sm">For active business processes and automations.</p>
              <div className="pt-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$149</span>
                <span className="text-slate-400 text-sm ml-1">/month</span>
              </div>
              <ul className="space-y-3 pt-6 text-sm text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-400" />
                  <span>Unlimited active agents</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-400" />
                  <span>10,000 credit calls / mo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-400" />
                  <span>Observability logs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-400" />
                  <span>Role-based team access</span>
                </li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 w-full py-2.5 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white rounded-lg text-sm font-semibold text-center transition-colors shadow-md shadow-brand-900/20">
              Go Pro
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-2xl glass-panel flex flex-col justify-between text-left">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xl tracking-tight">Enterprise</h3>
              <p className="text-slate-400 text-sm">For high-throughput execution & custom models.</p>
              <div className="pt-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">Custom</span>
              </div>
              <ul className="space-y-3 pt-6 text-sm text-slate-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>Dedicated compute nodes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>SLA uptime agreements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-500" />
                  <span>Direct Slack engineering support</span>
                </li>
              </ul>
            </div>
            <a href="#" className="mt-8 w-full py-2.5 bg-dark-900 hover:bg-dark-800 text-white rounded-lg text-sm font-semibold text-center transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-900">
        <div className="text-center mb-12 space-y-4">
          <HelpCircle className="h-8 w-8 text-brand-500 mx-auto" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="rounded-xl border border-dark-800/80 bg-dark-900/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-dark-900/40 transition-colors focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-slate-400 text-sm sm:text-base leading-relaxed border-t border-dark-900/40 bg-dark-950/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
