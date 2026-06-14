import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Pricing() {
  return (
    <>
      <Navbar />
      {/* Pricing Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Tailored for Any Scale
          </h2>
          <p className="text-slate-400/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Start completely free to prototype your agents. Upgrade seamlessly as execution usage scales.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      <Footer />
    </>
  );
}
