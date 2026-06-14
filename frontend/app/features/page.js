import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Cpu } from "lucide-react";

export default function Features() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
          Powerful Features
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Aether AI equips you with autonomous agents, real‑time analytics, and seamless integrations to supercharge your business.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <div className="p-8 rounded-2xl glass-panel flex flex-col justify-between text-left">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Autonomous Agents</h3>
            <p className="text-slate-400 text-sm">Agents research, plan, and execute complex workflows without human intervention.</p>
            <ul className="space-y-2 text-slate-300 text-sm mt-2">
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>Self‑learning capabilities</span></li>
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>Multi‑step task orchestration</span></li>
            </ul>
          </div>
        </div>
        {/* Card 2 */}
        <div className="p-8 rounded-2xl glass-panel flex flex-col justify-between text-left">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Real‑time Analytics</h3>
            <p className="text-slate-400 text-sm">Instant insights from data streams, visual dashboards, and alerting.</p>
            <ul className="space-y-2 text-slate-300 text-sm mt-2">
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>Live metrics & charts</span></li>
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>Customizable KPI panels</span></li>
            </ul>
          </div>
        </div>
        {/* Card 3 */}
        <div className="p-8 rounded-2xl glass-panel flex flex-col justify-between text-left">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Seamless Integration</h3>
            <p className="text-slate-400 text-sm">Connect to any service via REST, webhook, or SDK – all with zero friction.</p>
            <ul className="space-y-2 text-slate-300 text-sm mt-2">
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>OAuth & API keys</span></li>
              <li className="flex items-center space-x-2"><Cpu className="h-4 w-4 text-brand-500" /><span>Webhooks & event streams</span></li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
