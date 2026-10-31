/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS_DATA } from '../../data/destinations';
import { Bookmark, Droplets, Wind, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

export const FeaturedDestinations: React.FC = () => {
  const { navigateTo, savedDestinations, toggleSaveDestination } = useApp();
  const [activeRegion, setActiveRegion] = useState<'All' | 'Asia' | 'Europe' | 'Americas' | 'Africa'>('All');

  const filtered =
    activeRegion === 'All'
      ? DESTINATIONS_DATA.slice(0, 6)
      : DESTINATIONS_DATA.filter((d) => d.region === activeRegion);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="label-caps text-[#52796F] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Clinical Destination Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
              Curated Expeditions &amp; Health Profiles
            </h2>
            <p className="text-sm text-[#484551] font-light mt-2 max-w-xl">
              Every expedition dossier combines municipal pathogen analysis, altitude physics, endemic vector mapping, and hospital triage coordinates.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
            {(['All', 'Europe', 'Asia', 'Americas', 'Africa'] as const).map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setActiveRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition ${
                  activeRegion === reg
                    ? 'bg-[#3C2F80] text-white shadow-sm'
                    : 'bg-[#FCF8FF] text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => {
            const isSaved = savedDestinations.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-[#FCF8FF] rounded-3xl overflow-hidden border border-[#3C2F80]/10 hover:border-[#7D52F4]/40 transition-all duration-300 brand-shadow hover:brand-shadow-lg flex flex-col"
              >
                {/* Visual Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveDestination(dest.id);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#121026] hover:bg-white hover:text-rose-600 transition shadow-md"
                    title={isSaved ? 'Remove from Saved' : 'Save Destination'}
                  >
                    <Heart
                      className={`w-4 h-4 transition ${
                        isSaved ? 'fill-rose-500 text-rose-500' : 'text-gray-700'
                      }`}
                    />
                  </button>

                  {/* Health Score Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#121026]/85 backdrop-blur-md text-white text-xs font-medium border border-white/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Health Index: {dest.overallHealthScore}/100</span>
                  </div>

                  {/* Title & Tagline overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="label-caps text-[#C1EBDF] mb-0.5">{dest.country} • {dest.region}</div>
                    <h3 className="text-xl font-normal tracking-tight leading-tight">{dest.name}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#484551] line-clamp-2 font-light leading-relaxed">
                    {dest.tagline}
                  </p>

                  {/* Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-gray-100 flex items-center gap-2">
                      <Droplets
                        className={`w-3.5 h-3.5 ${
                          dest.waterSafety.rating === 'safe'
                            ? 'text-emerald-500'
                            : dest.waterSafety.rating === 'caution'
                            ? 'text-amber-500'
                            : 'text-rose-500'
                        }`}
                      />
                      <span className="truncate font-medium text-gray-700">
                        {dest.waterSafety.status}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-gray-100 flex items-center gap-2">
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span className="truncate font-medium text-gray-700">
                        AQI {dest.airQuality.aqi} • {dest.airQuality.rating}
                      </span>
                    </div>
                  </div>

                  {/* Altitude & Timezone note */}
                  <div className="text-[11px] text-[#797582] flex items-center justify-between border-t border-gray-200/60 pt-3">
                    <span>Elev: {dest.altitudeMeters}m</span>
                    <span>{dest.timezone}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => navigateTo('destinations', dest.id)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow"
                  >
                    <span>View Clinical Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => navigateTo('destinations')}
            className="py-3 px-8 rounded-full border border-[#3C2F80] text-[#3C2F80] hover:bg-[#3C2F80] hover:text-white text-xs font-semibold tracking-wide transition shadow-sm"
          >
            Explore Complete 194-Nation Directory →
          </button>
        </div>
      </div>
    </section>
  );
};
