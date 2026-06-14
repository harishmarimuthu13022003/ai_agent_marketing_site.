import React from 'react';
import { ShieldCheck, Compass, Heart, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Reliability First',
      desc: 'AI agents must run predictably. We design systems that handle data pipelines and integrations with zero prompt hallucinations.',
      icon: ShieldCheck,
    },
    {
      title: 'Ethical Grounding',
      desc: 'All our solutions conform strictly to workspace data isolation boundaries, ensuring user information is never leaked.',
      icon: Compass,
    },
    {
      title: 'Human-in-the-Loop',
      desc: 'We treat AI as a multiplier, not a replacement. We construct review check gates so humans always oversee final actions.',
      icon: Heart,
    },
  ];

  const team = [
    {
      name: 'Dr. Evelyn Vance',
      role: 'CEO & Founder',
      bio: 'Former AI Lead at DeepMind. Evelyn focuses on autonomous agent architectures and large-scale model orchestration.',
      avatar: 'EV'
    },
    {
      name: 'Liam Chen',
      role: 'Head of Infrastructure',
      bio: 'Prior DevOps Architect at AWS. Liam leads our secure distributed database syncing and agent scaling systems.',
      avatar: 'LC'
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Lead UX Designer',
      bio: 'Award-winning interactive designer. Sofia shapes the agent tracking interfaces to be exceptionally readable.',
      avatar: 'SR'
    }
  ];

  return (
    <div className="relative overflow-hidden py-16">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-700/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 mb-20 space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white">Our Mission</h1>
        <p className="text-slate-400/90 text-lg sm:text-xl md:text-xl/relaxed leading-relaxed max-w-3xl mx-auto font-medium">
          We build robust agent infrastructure so that modern organizations can confidently delegate complex cognitive processes.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">The Aether AI Story</h2>
          <p className="text-slate-400/90 text-base sm:text-lg leading-relaxed">
            In early 2024, our founders realized that chat interfaces were only the first phase of the generative AI revolution. While conversational chatbots are fun, businesses require agent loops that can query databases, run scripts, cross-reference data sources, and self-heal from failures.
          </p>
          <p className="text-slate-400/90 text-base sm:text-lg leading-relaxed">
            We built Aether AI from the ground up to support modular cognitive loops. Our agents don't just reply — they verify, evaluate, and complete the tasks they are assigned.
          </p>
        </div>
        <div className="p-8 rounded-2xl glass-panel relative flex flex-col justify-center border-brand-500/10 min-h-[260px]">
          <div className="space-y-4">
            <h3 className="text-brand-400 font-bold text-xs sm:text-sm tracking-wider uppercase">Founding Principle</h3>
            <p className="text-white text-lg sm:text-xl font-medium italic leading-relaxed">
              "We believe the future of software isn't just static apps; it's a network of collaborative AI specialists operating within safe, auditable boundaries."
            </p>
            <div className="flex items-center space-x-2 pt-2 text-slate-400 text-xs sm:text-sm">
              <Users className="h-4 w-4" />
              <span>Aether AI Core Leadership Group</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-dark-900/20 border-y border-dark-900/80 py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="p-6 rounded-xl glass-panel space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{val.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white text-center mb-12">Meet the Innovators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold font-mono shadow-md">
                {member.avatar}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-brand-400 text-xs sm:text-sm font-semibold">{member.role}</p>
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
