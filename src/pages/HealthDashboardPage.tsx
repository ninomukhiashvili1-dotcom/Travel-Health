/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import {
  Activity,
  Droplets,
  Zap,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sun,
  ShieldCheck,
  TrendingUp,
  Heart,
  Plus,
  RotateCcw,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const HealthDashboardPage: React.FC = () => {
  const {
    userProfile,
    selectedDestination,
    setSelectedDestinationId,
    savedDestinations,
    toggleSaveDestination,
    checklistItems,
    hydrationCount,
    addHydration,
    resetHydration,
    navigateTo,
    showToast,
  } = useApp();

  const [activeCurve, setActiveCurve] = useState<'melatonin' | 'cortisol'>('melatonin');
  const [alertFilter, setAlertFilter] = useState<'all' | 'warning' | 'advisory'>('all');

  const dest = selectedDestination;
  const packedCount = checklistItems.filter((i) => i.packed).length;
  const totalChecklist = checklistItems.length;
  const checklistPercent = Math.round((packedCount / (totalChecklist || 1)) * 100);

  const hydrationTarget = 2500; // ml
  const hydrationPercent = Math.min(100, Math.round((hydrationCount / hydrationTarget) * 100));

  // Circadian hours
  const biologicalHour = 14; // 2:00 PM London
  const destinationHour = (biologicalHour + dest.utcOffset) % 24;

  const savedList = DESTINATIONS_DATA.filter((d) => savedDestinations.includes(d.id));

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Traveler Dossier Header */}
        <div className="bg-gradient-to-r from-[#261569] via-[#3C2F80] to-[#5F53A5] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#87AFA4] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="label-caps text-[#87AFA4]">TRAVELER DOSSIER</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-medium">
                  {userProfile.insurancePolicy.split(' ')[0]} Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                {userProfile.name}
              </h1>
              <p className="text-xs text-white/80 font-light mt-0.5">
                Home Base: {userProfile.homeCity} • Active Target: {dest.name} ({dest.country})
              </p>
            </div>
          </div>

          {/* Destination Switcher */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3">
            <div>
              <span className="label-caps text-[#C1EBDF] block text-[10px]">MONITORED EXPEDITION</span>
              <select
                value={dest.id}
                onChange={(e) => {
                  setSelectedDestinationId(e.target.value);
                  showToast(`Dashboard switched to ${e.target.value}`, 'info');
                }}
                className="bg-transparent font-medium text-sm text-white focus:outline-none cursor-pointer mt-0.5"
              >
                {DESTINATIONS_DATA.map((d) => (
                  <option key={d.id} value={d.id} className="text-[#121026]">
                    {d.name} ({d.country})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('destinations', dest.id)}
              className="px-3.5 py-1.5 rounded-xl bg-white text-[#261569] hover:bg-[#F0EBFF] text-xs font-semibold transition shrink-0"
            >
              Dossier →
            </button>
          </div>
        </div>

        {/* 4 Core Health Indicators Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Biometric Readiness */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="label-caps text-[#52796F]">READINESS INDEX</span>
                <ShieldCheck className="w-5 h-5 text-[#52796F]" />
              </div>
              <div className="text-3xl font-light text-[#121026]">94 / 100</div>
              <div className="text-xs text-[#52796F] font-semibold mt-1">Optimal Physiological Reserve</div>
              <p className="text-xs text-[#797582] font-light mt-2">
                Simulated biometric estimate based on sleep regularity, resting heart rate, and pre-departure protocol.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[#797582]">Stress: Low</span>
              <span className="text-[#52796F] font-medium">Immune Buffer: High</span>
            </div>
          </div>

          {/* 2. Hydration Balance Tracker (Interactive!) */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="label-caps text-sky-600">IN-FLIGHT HYDRATION</span>
                <Droplets className="w-5 h-5 text-sky-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-light text-[#121026]">{hydrationCount}</div>
                <div className="text-xs text-[#797582]">/ {hydrationTarget} ml target</div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-[#7D52F4] transition-all duration-300"
                  style={{ width: `${hydrationPercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-[#797582] mt-2">
                Cabin altitude pulls 200ml/hr from mucosal tissue. Keep sipping electrolytes.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => addHydration(250)}
                className="flex-1 py-1.5 rounded-lg bg-[#FCF8FF] border border-[#3C2F80]/20 text-[#3C2F80] hover:bg-[#F0EBFF] text-[11px] font-semibold transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> 250ml
              </button>
              <button
                type="button"
                onClick={() => addHydration(500)}
                className="flex-1 py-1.5 rounded-lg bg-[#FCF8FF] border border-[#3C2F80]/20 text-[#3C2F80] hover:bg-[#F0EBFF] text-[11px] font-semibold transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> 500ml
              </button>
              <button
                type="button"
                onClick={resetHydration}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition"
                title="Reset Hydration Counter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Circadian Clock & Phase Shift */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="label-caps text-[#7D52F4]">CIRCADIAN CLOCK</span>
                <Clock className="w-5 h-5 text-[#7D52F4]" />
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-[#797582]">Internal Body Clock</div>
                  <div className="text-xl font-light text-[#121026]">14:00 (London)</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#797582]">Target Clock</div>
                  <div className="text-xl font-light text-[#7D52F4]">
                    {destinationHour < 10 ? `0${destinationHour}` : destinationHour}:00
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#52796F] font-semibold mt-3">
                Shift: {dest.utcOffset >= 0 ? `+${dest.utcOffset}` : dest.utcOffset} Hours
              </div>
              <p className="text-[11px] text-[#797582] mt-1 font-light">
                {dest.circadianAdvice.recoveryDays} days recommended adaptation period.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="text-[11px] text-[#7D52F4] font-semibold hover:underline flex items-center justify-between w-full"
              >
                <span>Recalibrate Flight Times</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 4. Altitude & Environmental Stress */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="label-caps text-amber-600">ENVIRONMENTAL STRESS</span>
                <Sun className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl font-light text-[#121026]">
                UV {dest.climateRisk.uvIndex}
              </div>
              <div className="text-xs text-[#121026] font-semibold mt-1">
                Altitude: {dest.altitudeMeters}m ({dest.altitudeRisk.riskLevel} risk)
              </div>
              <p className="text-[11px] text-[#797582] mt-2 font-light">
                Air Quality: AQI {dest.airQuality.aqi} ({dest.airQuality.rating}). Water: {dest.waterSafety.status}.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[#797582]">Temp: {dest.climateRisk.tempRange}</span>
              <span className="text-amber-600 font-semibold">{dest.climateRisk.heatStressRisk} Heat</span>
            </div>
          </div>
        </div>

        {/* Interactive Charts & Preparation Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Circadian Phase Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="label-caps text-[#7D52F4] mb-1">HORMONAL PHASING</div>
                <h3 className="text-xl font-light text-[#121026]">
                  24-Hour Endogenous Hormone Curve
                </h3>
              </div>

              {/* Curve Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FCF8FF] border border-[#3C2F80]/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCurve('melatonin')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeCurve === 'melatonin'
                      ? 'bg-[#3C2F80] text-white shadow-sm'
                      : 'text-[#484551] hover:text-[#121026]'
                  }`}
                >
                  Melatonin (Pineal)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCurve('cortisol')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeCurve === 'cortisol'
                      ? 'bg-[#3C2F80] text-white shadow-sm'
                      : 'text-[#484551] hover:text-[#121026]'
                  }`}
                >
                  Cortisol (Vigilance)
                </button>
              </div>
            </div>

            {/* Interactive SVG Chart Rendering */}
            <div className="bg-[#FCF8FF] rounded-2xl p-4 sm:p-6 border border-[#3C2F80]/10">
              <div className="flex items-center justify-between text-xs text-[#797582] mb-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#7D52F4] inline-block"></span> Home Circadian Curve
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#52796F] border-b border-dashed inline-block"></span> Target Destination Shift
                </span>
              </div>

              <div className="relative h-48 w-full flex items-end">
                {/* SVG Curve */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                  <defs>
                    <linearGradient id="melatoninGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7D52F4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7D52F4" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="cortisolGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EAB308" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#E4DFFE" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#E4DFFE" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#E4DFFE" strokeDasharray="3 3" />

                  {activeCurve === 'melatonin' ? (
                    <>
                      {/* Home Melatonin Curve */}
                      <path
                        d="M 0 140 Q 100 140 180 120 Q 260 20 320 20 Q 370 20 400 140"
                        fill="none"
                        stroke="#7D52F4"
                        strokeWidth="3"
                      />
                      {/* Destination Shifted Melatonin Curve */}
                      <path
                        d="M 0 80 Q 70 20 120 20 Q 180 20 240 140 Q 320 140 400 140"
                        fill="none"
                        stroke="#52796F"
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />
                    </>
                  ) : (
                    <>
                      {/* Cortisol Peak Curve (Peaks at 08:00 AM) */}
                      <path
                        d="M 0 130 Q 60 140 120 20 Q 180 80 280 120 Q 340 140 400 140"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="3"
                      />
                      {/* Destination Shifted Cortisol */}
                      <path
                        d="M 0 30 Q 60 80 160 120 Q 240 140 320 140 Q 380 40 400 20"
                        fill="none"
                        stroke="#52796F"
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />
                    </>
                  )}
                </svg>
              </div>

              {/* X-axis time labels */}
              <div className="grid grid-cols-5 text-[10px] text-[#797582] font-mono pt-3 border-t border-[#3C2F80]/10 text-center">
                <span>00:00</span>
                <span>06:00 (Dawn)</span>
                <span>12:00 (Noon)</span>
                <span>18:00 (Dusk)</span>
                <span>24:00</span>
              </div>
            </div>

            <div className="text-xs text-[#484551] font-light leading-relaxed bg-[#FCF8FF] p-4 rounded-xl border border-gray-100">
              <span className="font-semibold text-[#121026]">Optimal Photic Window for Today:</span> Expose retinas to natural morning sunlight between 07:30 and 09:30 AM in {dest.name}. This accelerates phase advance by 1.8 hours daily.
            </div>
          </div>

          {/* Right Column: Travel Preparation Progress & Checklist Summary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Checklist Progress Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="label-caps text-[#52796F]">CHECKLIST READINESS</div>
                  <h3 className="text-xl font-light text-[#121026]">
                    Preparation Progress
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-[#3C2F80]">{checklistPercent}%</div>
                  <div className="text-[10px] text-[#797582] font-medium">
                    {packedCount} of {totalChecklist} Packed
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3C2F80] via-[#7D52F4] to-[#52796F] transition-all duration-500"
                  style={{ width: `${checklistPercent}%` }}
                ></div>
              </div>

              {/* Top Unpacked Items */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-[#121026]">Next Priority Items:</div>
                {checklistItems
                  .filter((i) => !i.packed)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigateTo('checklist')}
                      className="p-3 rounded-xl bg-[#FCF8FF] border border-gray-100 text-xs flex items-center justify-between cursor-pointer hover:bg-[#F0EBFF] transition"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                        <span className="truncate text-[#121026]">{item.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-[#7D52F4] shrink-0">
                        {item.priority}
                      </span>
                    </div>
                  ))}
              </div>

              <button
                type="button"
                onClick={() => navigateTo('checklist')}
                className="w-full py-2.5 px-4 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition flex items-center justify-center gap-2 shadow"
              >
                <span>Open Full Smart Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Travel Health Protocol Generator Link */}
            <div className="bg-gradient-to-br from-[#FCF8FF] to-[#EBF3EE] rounded-3xl p-6 border border-[#52796F]/20 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#52796F]" />
                <h4 className="font-medium text-sm text-[#012D25]">Custom Health Protocol</h4>
              </div>
              <p className="text-xs text-[#274E45] font-light leading-relaxed">
                Generate a 4-page clinical itinerary incorporating your allergies, pre-existing conditions, and daily jet lag timeline.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('planner')}
                className="w-full py-2.5 rounded-full bg-[#52796F] hover:bg-[#1C433B] text-white text-xs font-semibold transition shadow-sm"
              >
                Launch Planner Wizard →
              </button>
            </div>
          </div>
        </div>

        {/* Saved Destinations Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="label-caps text-[#3C2F80]">SAVED EXPEDITION DOSSIERS</div>
              <h3 className="text-xl font-light text-[#121026]">
                Your Bookmarked Destinations ({savedList.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('destinations')}
              className="text-xs text-[#7D52F4] font-semibold hover:underline"
            >
              Browse Catalog →
            </button>
          </div>

          {savedList.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No saved destinations yet. Explore and save your upcoming trips.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedList.map((d) => (
                <div
                  key={d.id}
                  className="bg-[#FCF8FF] rounded-2xl overflow-hidden border border-[#3C2F80]/10 flex flex-col justify-between group"
                >
                  <div className="h-40 relative">
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={() => toggleSaveDestination(d.id)}
                        className="p-1.5 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow transition"
                        title="Remove from Saved"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                      Health Score: {d.overallHealthScore}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-[#121026]">{d.name}</h4>
                      <p className="text-xs text-[#797582]">{d.country}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDestinationId(d.id);
                          showToast(`Active expedition set to ${d.name}`, 'success');
                        }}
                        className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition ${
                          dest.id === d.id
                            ? 'bg-[#EBF3EE] text-[#52796F] border border-[#52796F]/30'
                            : 'bg-white border border-gray-200 text-[#121026] hover:bg-[#F0EBFF]'
                        }`}
                      >
                        {dest.id === d.id ? 'Active Focus' : 'Monitor Trip'}
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('destinations', d.id)}
                        className="p-1.5 rounded-full bg-[#3C2F80] text-white hover:bg-[#261569] transition"
                        title="Open Full Dossier"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
