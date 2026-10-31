/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import {
  Compass,
  MapPin,
  Clock,
  Mountain,
  Droplets,
  Wind,
  Sun,
  ShieldAlert,
  ShieldCheck,
  Phone,
  Building2,
  Calendar,
  Heart,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const DestinationDetailsPage: React.FC = () => {
  const {
    selectedDestination,
    setSelectedDestinationId,
    savedDestinations,
    toggleSaveDestination,
    navigateTo,
    showToast,
  } = useApp();

  const [receivedVaccines, setReceivedVaccines] = useState<string[]>(['Routine MMR, DTaP, Polio']);

  const dest = selectedDestination;
  const isSaved = savedDestinations.includes(dest.id);

  const toggleVaccine = (vac: string) => {
    setReceivedVaccines((prev) => {
      if (prev.includes(vac)) {
        showToast(`Unchecked ${vac}`, 'info');
        return prev.filter((v) => v !== vac);
      } else {
        showToast(`Marked ${vac} as completed/vaccinated!`, 'success');
        return [...prev, vac];
      }
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Destination Switcher Bar */}
        <div className="bg-white rounded-2xl p-4 brand-shadow border border-[#3C2F80]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#3C2F80]" />
            <span className="label-caps text-[#484551]">SELECT ACTIVE EXPEDITION:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {DESTINATIONS_DATA.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDestinationId(d.id)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
                  d.id === dest.id
                    ? 'bg-[#3C2F80] text-white shadow-sm'
                    : 'bg-[#FCF8FF] text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
                }`}
              >
                {d.name.split('&')[0]} ({d.country})
              </button>
            ))}
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden brand-shadow-lg min-h-[420px] flex flex-col justify-end p-6 sm:p-10 text-white">
          <img
            src={dest.heroImage}
            alt={dest.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121026] via-[#121026]/40 to-transparent"></div>

          {/* Top Floating Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-xs font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Overall Health Preparedness: {dest.overallHealthScore}/100</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSaveDestination(dest.id)}
                className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#121026] hover:bg-white text-xs font-semibold flex items-center gap-2 shadow-lg transition"
              >
                <Heart
                  className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`}
                />
                <span>{isSaved ? 'Saved to Dossier' : 'Save Expedition'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Hero Details */}
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#C1EBDF] font-semibold">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {dest.coordinates}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {dest.timezone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5" /> Elevation: {dest.altitudeMeters}m
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white">{dest.name}</h1>
            <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
              {dest.description}
            </p>
          </div>
        </div>

        {/* 4 Core Clinical Health Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Water Safety */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-caps text-[#52796F]">WATER SANITATION</span>
              <Droplets
                className={`w-5 h-5 ${
                  dest.waterSafety.rating === 'safe'
                    ? 'text-emerald-500'
                    : dest.waterSafety.rating === 'caution'
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}
              />
            </div>
            <div>
              <div className="text-xl font-light text-[#121026]">{dest.waterSafety.status}</div>
              <p className="text-xs text-[#484551] font-light mt-1.5 leading-relaxed">
                {dest.waterSafety.notes}
              </p>
            </div>
          </div>

          {/* Air Quality & Allergens */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-caps text-sky-600">AIR &amp; ALLERGENS</span>
              <Wind className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <div className="text-xl font-light text-[#121026]">
                AQI {dest.airQuality.aqi} — {dest.airQuality.rating}
              </div>
              <p className="text-xs text-[#484551] font-light mt-1.5 leading-relaxed">
                PM2.5: {dest.airQuality.pm25}. Primary allergen: {dest.airQuality.primaryAllergen}.
              </p>
            </div>
          </div>

          {/* Climate & UV Stress */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-caps text-amber-600">CLIMATE &amp; UV</span>
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xl font-light text-[#121026]">
                UV Index: {dest.climateRisk.uvIndex} ({dest.climateRisk.tempRange})
              </div>
              <p className="text-xs text-[#484551] font-light mt-1.5 leading-relaxed">
                Humidity: {dest.climateRisk.humidity}. Heat stress level: {dest.climateRisk.heatStressRisk}.
              </p>
            </div>
          </div>

          {/* Altitude & Barometric */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-caps text-[#7D52F4]">ALTITUDE PROFILE</span>
              <Mountain className="w-5 h-5 text-[#7D52F4]" />
            </div>
            <div>
              <div className="text-xl font-light text-[#121026]">
                {dest.altitudeMeters}m ({dest.altitudeRisk.riskLevel} Risk)
              </div>
              <p className="text-xs text-[#484551] font-light mt-1.5 leading-relaxed">
                {dest.altitudeRisk.advisory}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Deep Clinical Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Vaccinations & Endemic Vectors */}
          <div className="lg:col-span-7 space-y-8">
            {/* Interactive Vaccine Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="label-caps text-[#52796F] mb-1">IMMUNIZATION PROTOCOL</div>
                  <h3 className="text-xl font-light text-[#121026]">
                    Vaccination &amp; Antibody Readiness
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3EE] text-[#52796F]">
                  {receivedVaccines.length} Marked Current
                </span>
              </div>

              {/* Mandatory */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Mandatory Requirements for Entry
                </h4>
                <div className="space-y-2">
                  {dest.vaccines.mandatory.map((vac) => {
                    const isChecked = receivedVaccines.includes(vac);
                    return (
                      <div
                        key={vac}
                        onClick={() => toggleVaccine(vac)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? 'bg-[#EBF3EE] border-[#52796F]/30 text-[#121026]'
                            : 'bg-[#FCF8FF] border-gray-200 hover:border-[#7D52F4]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#3C2F80] accent-[#3C2F80] cursor-pointer"
                          />
                          <span className="text-xs font-medium">{vac}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-500">
                          {isChecked ? 'Valid Record' : 'Action Needed'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3C2F80] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Clinically Recommended for Travel
                </h4>
                <div className="space-y-2">
                  {dest.vaccines.recommended.map((vac) => {
                    const isChecked = receivedVaccines.includes(vac);
                    return (
                      <div
                        key={vac}
                        onClick={() => toggleVaccine(vac)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? 'bg-[#EBF3EE] border-[#52796F]/30 text-[#121026]'
                            : 'bg-[#FCF8FF] border-gray-200 hover:border-[#7D52F4]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#3C2F80] accent-[#3C2F80] cursor-pointer"
                          />
                          <span className="text-xs font-medium">{vac}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-500">
                          {isChecked ? 'Valid Record' : 'Recommended'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Endemic Pathogens */}
              <div className="pt-2 border-t border-gray-100">
                <div className="label-caps text-[#797582] mb-2">Endemic Pathogens Monitored:</div>
                <div className="flex flex-wrap gap-2">
                  {dest.vaccines.endemicDiseases.map((dis, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      {dis}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Local Disease & Health Alerts */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-light text-[#121026]">Local Epidemiological Notices</h3>
              </div>
              <div className="space-y-3">
                {dest.healthAlerts.map((alt) => (
                  <div key={alt.id} className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#121026]">{alt.title}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {alt.level}
                      </span>
                    </div>
                    <p className="text-xs text-[#484551] font-light leading-relaxed">{alt.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hospitals & Circadian Light Protocol */}
          <div className="lg:col-span-5 space-y-8">
            {/* Circadian Recovery Schedule */}
            <div className="bg-gradient-to-br from-[#261569] to-[#3C2F80] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="label-caps text-[#87AFA4]">CIRCADIAN CHRONOBIOLOGY</div>
                <Sparkles className="w-5 h-5 text-[#87AFA4]" />
              </div>

              <div>
                <div className="text-2xl font-light">
                  {dest.circadianAdvice.recoveryDays} Days Adaptation
                </div>
                <p className="text-xs text-white/75 mt-1 font-light">
                  Pineal shift strategy when flying from Europe / Americas.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-semibold text-[#C1EBDF] mb-0.5">Morning Photic Exposure:</div>
                  <div className="font-light text-white/90">{dest.circadianAdvice.morningLight}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-semibold text-[#C1EBDF] mb-0.5">Evening Wind-Down Protocol:</div>
                  <div className="font-light text-white/90">{dest.circadianAdvice.eveningWindDown}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-semibold text-[#C1EBDF] mb-0.5">Melatonin Timing:</div>
                  <div className="font-light text-white/90">{dest.circadianAdvice.melatoninTiming}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('wellness-kit')}
                className="w-full py-3 rounded-full bg-white text-[#261569] text-xs font-semibold hover:bg-[#F0EBFF] transition shadow"
              >
                Order Circadian Reset Pack ($68)
              </button>
            </div>

            {/* International Medical Facilities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#3C2F80]" />
                <h3 className="text-lg font-light text-[#121026]">Emergency Hospitals &amp; Clinics</h3>
              </div>
              <p className="text-xs text-[#797582] font-light">
                English-speaking medical teams verified for international travelers.
              </p>

              <div className="space-y-4 pt-1">
                {dest.hospitals.map((hosp, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-100 space-y-2">
                    <div className="font-semibold text-xs text-[#121026]">{hosp.name}</div>
                    <div className="text-xs text-[#797582]">{hosp.address}</div>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                      {hosp.englishProficient && (
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF3EE] text-[#52796F] font-semibold">
                          English Speaking
                        </span>
                      )}
                      {hosp.traumaCenter && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold">
                          Level 1 Trauma Triage
                        </span>
                      )}
                      <span className="text-gray-500 font-medium">{hosp.distance}</span>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`tel:${hosp.phone}`}
                        onClick={() => showToast(`Dialing ${hosp.name}...`, 'info')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#3C2F80]/20 text-[#3C2F80] hover:bg-[#F0EBFF] text-xs font-semibold transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{hosp.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-3xl bg-[#FCF8FF] border border-[#3C2F80]/15 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#121026]">
                Expedition Preparation Tools
              </h4>
              <button
                type="button"
                onClick={() => navigateTo('planner')}
                className="w-full py-3 px-4 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Generate Custom Health Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('checklist')}
                className="w-full py-3 px-4 rounded-full border border-[#3C2F80]/20 bg-white text-[#3C2F80] hover:bg-[#F0EBFF] text-xs font-semibold transition"
              >
                View Smart Packing Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
