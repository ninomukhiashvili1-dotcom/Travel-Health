/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from '../components/home/Hero';
import { JetLagCalculator } from '../components/home/JetLagCalculator';
import { FeaturedDestinations } from '../components/home/FeaturedDestinations';
import { HealthEngineFeatures } from '../components/home/HealthEngineFeatures';
import { HealthAlertsTicker } from '../components/home/HealthAlertsTicker';
import { Testimonials } from '../components/home/Testimonials';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-0">
      {/* Editorial Luxury Hero */}
      <Hero />

      {/* Global Health Alerts Live Bulletin */}
      <HealthAlertsTicker />

      {/* Featured Clinical Destination Dossiers */}
      <FeaturedDestinations />

      {/* Chronobiology Circadian Engine */}
      <JetLagCalculator />

      {/* Four Clinical Pillars Feature Showcase */}
      <HealthEngineFeatures />

      {/* Testimonials & Medical Advisory Endorsements */}
      <Testimonials />

      {/* Bottom Conversion & Expedition Readiness Callout */}
      <section className="py-20 bg-[#261569] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#87AFA4] font-semibold mb-6">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>CLINICAL TRAVEL PREPARATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-6">
            Ready to Traverse Borders Without Fatigue?
          </h2>
          <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate your personalized clinical health dossier in less than 2 minutes. Sync vaccines, jet lag light timing, and emergency support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('planner')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white text-[#261569] hover:bg-[#F0EBFF] font-semibold text-xs tracking-wide transition shadow-xl flex items-center justify-center gap-2"
            >
              <span>Build My Travel Health Plan</span>
              <ArrowRight className="w-4 h-4 text-[#7D52F4]" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('checklist')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-full border border-white/30 text-white hover:bg-white/10 font-semibold text-xs tracking-wide transition"
            >
              Access Smart Travel Checklist
            </button>
          </div>
        </div>

        {/* Ambient background blur circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7D52F4]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#52796F]/30 rounded-full blur-3xl pointer-events-none"></div>
      </section>
    </div>
  );
};
