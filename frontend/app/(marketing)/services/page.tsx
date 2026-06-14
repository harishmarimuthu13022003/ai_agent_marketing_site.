import React from 'react';
import { Cpu, ShieldCheck, Zap, Layers, Network, Terminal, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const offerings = [
    {
      title: 'Custom Agent Development',
      desc: 'We map out your operational bottlenecks and build specialized cognitive workflows. From retrieval-augmented support systems to detailed financial research compilers, we wire agents that understand instructions.',
      icon: Cpu,
      points: ['Specialized system prompts', 'Dynamic routing parameters', 'Safety & policy checking layers'],
      color: 'border-violet-500/20 text-violet-400'
    },
    {
      title: 'Agent Hosting & Observability',
      desc: 'Deploy and scale your agent containers without managing complex servers. Track execution steps, input/output logs, credit budgets, and prompt latency inside a beautiful dashboard environment.',
      icon: LineChart,
      points: ['Real-time step debugging', 'Latencies & cost analytics', 'Drift & policy compliance logs'],
      color: 'border-emerald-500/20 text-emerald-400'
    },
    {
      title: 'Workflow Orchestration',
      desc: 'Connect your agents to Slack channels, Gmail inboxes, CRM tables, and internal REST endpoints. Our pipeline links separate autonomous steps together, self-healing from API faults automatically.',
      icon: Zap,
      points: ['Multi-agent sync networks', 'Conditional decision trees', 'Automatic task retries'],
      color: 'border-blue-500/20 text-blue-400'
    },
    {
      title: 'Enterprise Safety Integrations',
      desc: 'Integrate deep security constraints directly inside your agent systems. Our secure middleware restricts agents from performing unauthorized database queries, using custom role-based API authorizations.',
      icon: ShieldCheck,
      points: ['TLS 1.3 & AES-256 standards', 'Role-based access boundaries', 'Audit compliance records'],
      color: 'border-brand-500/20 text-brand-400'
    }
  ];

  return (
    <div className="relative overflow-hidden py-16">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-700/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 mb-20 space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white">Our Services & Solutions</h1>
        <p className="text-slate-400/90 text-lg sm:text-xl md:text-xl/relaxed leading-relaxed max-w-3xl mx-auto font-medium">
          From developer sandboxes to scale production-grade operations, we provide the platform and development expertise.
        </p>
      </section>

      {/* Offerings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {offerings.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`p-8 rounded-2xl glass-panel border ${item.color} flex flex-col justify-between`}>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-dark-850 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>
                <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
                
                <ul className="space-y-2 pt-2">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center space-x-2 text-sm text-slate-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* Dynamic Architecture Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-8 rounded-2xl bg-gradient-to-tr from-brand-950/20 via-dark-900/40 to-violet-950/20 border border-brand-500/15 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">Ready to automate your workflows?</h2>
          <p className="text-slate-400/90 text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Log in to access your authenticated agent builder dashboard, create new agent configurations, and start observing pipeline logs instantly.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              href="/register"
              className="px-8 py-3 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all shadow-md shadow-brand-900/20 hover:scale-[1.02]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
