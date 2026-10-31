/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS_DATA } from '../../data/destinations';
import { Search, Calendar, Compass, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo, setSelectedDestinationId, showToast } = useApp();
  const [selectedDest, setSelectedDest] = useState('kyoto');
  const [departureDate, setDepartureDate] = useState('2026-11-15');
  const [travelStyle, setTravelStyle] = useState('Wellness Retreat');

  const travelStyles = ['Wellness Retreat', 'High-Altitude Trek', 'Jungle Expedition', 'Digital Nomad'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedDestinationId(selectedDest);
    navigateTo('destinations', selectedDest);
    showToast(`Loaded health profile for ${DESTINATIONS_DATA.find(d => d.id === selectedDest)?.name}`, 'success');
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-8 pb-20">
      {/* Background Editorial Visual with Subtle Indigo Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Expedition Landscape"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7FA] via-[#261569]/40 to-[#121026]/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12 sm:mt-16">
        {/* Floating Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-[#EBF3EE] font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#87AFA4]" />
          <span>Next-Gen Travel Health &amp; Circadian Chronobiology</span>
        </div>

        {/* Slender Editorial Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6 text-white drop-shadow-sm">
          Voyage with <br className="hidden sm:inline" />
          <span className="font-normal italic text-[#C1EBDF]">Physiological Vitality</span>.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/85 font-light leading-relaxed mb-10">
          Eliminate trans-Pacific jet lag, master altitude acclimatization, and traverse foreign biomes with clinical travel medicine intelligence.
        </p>

        {/* Interactive Search & Trip Engine Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-4 sm:p-6 text-[#121026] brand-shadow-lg text-left">
          {/* Travel Style Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 border-b border-gray-100 text-xs">
            <span className="text-[#797582] font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1">
              Style:
            </span>
            {travelStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setTravelStyle(style)}
                className={`px-3 py-1 rounded-full font-medium transition shrink-0 ${
                  travelStyle === style
                    ? 'bg-[#3C2F80] text-white shadow-sm'
                    : 'bg-[#FCF8FF] text-[#484551] hover:bg-[#F0EBFF]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Destination Selector */}
            <div className="sm:col-span-5 bg-[#FCF8FF] rounded-2xl p-3 border border-[#3C2F80]/15 hover:border-[#7D52F4] transition">
              <label className="label-caps text-[#52796F] block mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Destination
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-transparent font-medium text-sm text-[#121026] focus:outline-none cursor-pointer"
              >
                {DESTINATIONS_DATA.map((dest) => (
                  <option key={dest.id} value={dest.id} className="text-[#121026]">
                    {dest.name} ({dest.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="sm:col-span-4 bg-[#FCF8FF] rounded-2xl p-3 border border-[#3C2F80]/15 hover:border-[#7D52F4] transition">
              <label className="label-caps text-[#52796F] block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Embarkation Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent font-medium text-sm text-[#121026] focus:outline-none cursor-pointer"
              />
            </div>

            {/* Primary Action Button */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-4 px-5 rounded-2xl bg-[#3C2F80] hover:bg-[#261569] text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <Search className="w-4 h-4" />
                <span>Analyze Risks</span>
              </button>
            </div>
          </form>

          {/* Quick Metrics Bar Under Search */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-[#797582] gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#52796F]" />
              <span>Real-time CDC, WHO &amp; ISTM Disease Registry</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('planner')}
                className="text-[#7D52F4] hover:underline font-semibold flex items-center gap-1"
              >
                Launch Custom Travel Planner <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Micro highlights under hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-left">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="text-2xl font-light text-white">99.4%</div>
            <div className="text-xs text-white/70 mt-0.5 font-normal">Circadian sync accuracy</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="text-2xl font-light text-[#C1EBDF]">194</div>
            <div className="text-xs text-white/70 mt-0.5 font-normal">Global nations covered</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="text-2xl font-light text-white">24/7</div>
            <div className="text-xs text-white/70 mt-0.5 font-normal">Consular &amp; hospital SOS</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="text-2xl font-light text-[#E5DEFF]">0 Slop</div>
            <div className="text-xs text-white/70 mt-0.5 font-normal">Physician-curated data</div>
          </div>
        </div>
      </div>
    </section>
  );
};
