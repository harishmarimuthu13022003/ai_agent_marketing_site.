'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Cpu, ShieldCheck, Zap, Activity, MessageSquare, 
  Search, Workflow, HelpCircle, CheckCircle, ChevronDown, Star 
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Supercharge Operations with Autonomous Workforces
          </h2>
          <p className="text-slate-400/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Aether AI supplies you with self-contained agent loops configured for distinct business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{feat.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-dark-900/50">
                  <Link href="/services" className="text-brand-400 hover:text-brand-300 font-semibold text-sm inline-flex items-center space-x-1">
                    <span>Learn how it works</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
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
