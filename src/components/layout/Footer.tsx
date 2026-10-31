/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Mail, CheckCircle2, Shield, HeartPulse, Globe2, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Global Health Bulletins & Ephemera.', 'success');
  };

  return (
    <footer className="bg-[#121026] text-white pt-16 pb-12 border-t border-[#3C2F80]/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3C2F80] flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-[#87AFA4]" />
              </div>
              <span className="text-xl font-light tracking-tight text-white">
                EARTH VOYAGE <span className="font-semibold text-[#87AFA4]">COMPASS</span>
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-sm font-light leading-relaxed">
              The international travel health &amp; circadian intelligence system. We bridge expedition medicine, chronobiology, and clinical destination protocols for discerning global travelers.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-white/50">
              <span className="flex items-center gap-1.5 text-[#87AFA4]">
                <Shield className="w-4 h-4" /> ISTM Clinical Standards
              </span>
              <span className="flex items-center gap-1.5 text-[#87AFA4]">
                <Globe2 className="w-4 h-4" /> 194 Nations Monitored
              </span>
            </div>
          </div>

          {/* Nav: Explorations */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#87AFA4]">Expeditions</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button
                  onClick={() => navigateTo('destinations', 'kyoto')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Kyoto &amp; Kansai <ArrowUpRight className="w-3 h-3 text-white/40" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations', 'zermatt')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Swiss Alpine Valleys <ArrowUpRight className="w-3 h-3 text-white/40" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations', 'costa-rica')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Costa Rica Bio-Corridors <ArrowUpRight className="w-3 h-3 text-white/40" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations', 'serengeti')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Serengeti Safari Corridor <ArrowUpRight className="w-3 h-3 text-white/40" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations')}
                  className="text-[#7D52F4] hover:underline transition font-medium"
                >
                  View All Destinations →
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Medical Tools */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#87AFA4]">Clinical Tools</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-white transition">
                  Circadian Optimizer
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('planner')} className="hover:text-white transition">
                  Travel Health Planner
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('checklist')} className="hover:text-white transition">
                  Smart Medical Checklist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wellness-kit')} className="hover:text-white transition">
                  Travel Wellness Kits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('emergency')} className="hover:text-rose-400 transition font-medium">
                  Global SOS Center
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#87AFA4]">Epidemic Bulletins</h4>
            <p className="text-xs text-white/60">
              Subscribe to bi-weekly WHO global pathogen alerts and circadian flight protocols.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#52796F]/20 border border-[#52796F]/40 text-xs text-[#87AFA4]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed. Verified reports will arrive in your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="physician@hospital.org"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#7D52F4] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#7D52F4] hover:bg-[#6636dc] text-white text-xs font-semibold transition"
                >
                  Join Health Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>
              Clinical Disclaimer: Voyage Wellness Compass provides scientific travel health guidance; it does not replace a tailored clinical consultation with a licensed travel medicine specialist.
            </span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <button onClick={() => navigateTo('about')} className="hover:underline">
              Medical Board
            </button>
            <button onClick={() => navigateTo('emergency')} className="hover:underline text-rose-400">
              Emergency Directory
            </button>
            <span>© {new Date().getFullYear()} Voyage Wellness Compass</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
