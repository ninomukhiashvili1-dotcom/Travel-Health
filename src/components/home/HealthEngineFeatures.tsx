/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Mountain, Bug, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const HealthEngineFeatures: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'circadian' | 'altitude' | 'tropical' | 'sos'>('circadian');

  const tabs = [
    {
      id: 'circadian' as const,
      label: 'Circadian Light Alignment',
      icon: Zap,
      subtitle: 'Eliminate jet lag fatigue using mathematical light timing & micro-dosed pineal regulation.',
      stats: ['40% faster recovery', 'Zero next-day fog', 'Pineal SCN phase shifts'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Open Circadian Optimizer',
      actionPage: 'dashboard' as const,
    },
    {
      id: 'altitude' as const,
      label: 'Hypobaric Altitude Shield',
      icon: Mountain,
      subtitle: 'Barometric acclimatization schedules, SpO2 monitoring thresholds, and AMS prevention.',
      stats: ['Safe vertical ascent curves', 'Diamox dosing protocols', 'SpO2 danger thresholds'],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'View High-Altitude Kit',
      actionPage: 'wellness-kit' as const,
    },
    {
      id: 'tropical' as const,
      label: 'Tropical Biome & Gut Armor',
      icon: Bug,
      subtitle: 'Defend mucosal barriers against enteropathogens, Aedes dengue vectors, and malaria parasites.',
      stats: ['WHO ORS rehydration', 'Picaridin barrier shield', 'Microbiome probiotics'],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Launch Health Planner',
      actionPage: 'planner' as const,
    },
    {
      id: 'sos' as const,
      label: 'Global SOS & Hospital Triage',
      icon: ShieldAlert,
      subtitle: 'Instant tap-to-call emergency lines, consular aid, and accredited JCI hospital coordinates.',
      stats: ['24/7 MedEvac dispatch', 'English-speaking doctors', 'Offline Digital Medical ID'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Access Emergency Center',
      actionPage: 'emergency' as const,
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-20 bg-[#FCF8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="label-caps text-[#7D52F4] mb-2 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> The Four Clinical Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
            Engineered for Extreme Vitality Across Borders
          </h2>
          <p className="text-sm text-[#484551] font-light mt-2">
            Standard travel apps recommend restaurants. Voyage Wellness Compass safeguards your physiology.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#3C2F80] text-white shadow-md'
                    : 'bg-white text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#87AFA4]' : 'text-[#7D52F4]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Panel */}
        <div className="bg-white rounded-3xl overflow-hidden brand-shadow border border-[#3C2F80]/10 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <div className="label-caps text-[#52796F]">Pillar Protocol</div>
            <h3 className="text-2xl sm:text-3xl font-light text-[#121026] tracking-tight">
              {current.label}
            </h3>
            <p className="text-sm sm:text-base text-[#484551] font-light leading-relaxed">
              {current.subtitle}
            </p>

            <div className="space-y-3 pt-2">
              {current.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#121026] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#52796F] shrink-0" />
                  <span>{stat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigateTo(current.actionPage)}
                className="py-3 px-6 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden">
            <img
              src={current.image}
              alt={current.label}
              className="w-full h-full object-cover min-h-[340px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
