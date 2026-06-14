'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Cpu className="h-7 w-7 text-brand-500" />
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-brand-400 bg-clip-text text-transparent">
                Aether AI
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI agents that actually get work done. Build, monitor, and scale custom workflows with intelligent agent networks.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Customer Support Agents
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Deep Research Agents
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Enterprise Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Stay Connected</h3>
            <p className="text-slate-400 text-sm">
              Subscribe to our weekly insights on AI orchestrations.
            </p>
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email"
                className="bg-dark-900 border border-dark-800 focus:border-brand-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Legal Strip */}
        <div className="border-t border-dark-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-xs">
            &copy; {currentYear} Aether AI, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Security Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
