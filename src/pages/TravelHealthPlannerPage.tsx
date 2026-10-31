/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import { HealthProtocol } from '../types';
import {
  Compass,
  Calendar,
  HeartPulse,
  ShieldCheck,
  Check,
  Printer,
  Download,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  FileText,
  Clock,
  Droplets,
  Package,
} from 'lucide-react';

export const TravelHealthPlannerPage: React.FC = () => {
  const { userProfile, addProtocol, showToast, navigateTo } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [destinationId, setDestinationId] = useState('kyoto');
  const [depDate, setDepDate] = useState('2026-11-20');
  const [retDate, setRetDate] = useState('2026-12-05');
  const [travelStyle, setTravelStyle] = useState('Wellness Retreat & Cultural Walks');

  const [ageGroup, setAgeGroup] = useState('30 - 45 years');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['None']);
  const [allergiesInput, setAllergiesInput] = useState(userProfile.allergies);
  const [fitnessLevel, setFitnessLevel] = useState('Moderate (10,000 steps daily)');

  const [hasRoutineVaccines, setHasRoutineVaccines] = useState(true);
  const [needsDailyMeds, setNeedsDailyMeds] = useState(true);
  const [requiresColdChainMeds, setRequiresColdChainMeds] = useState(false);

  // Generated Protocol
  const [generatedProtocol, setGeneratedProtocol] = useState<HealthProtocol | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const selectedDestObj = DESTINATIONS_DATA.find((d) => d.id === destinationId) || DESTINATIONS_DATA[0];

  const conditionOptions = [
    'None',
    'Asthma / Bronchial Sensitivity',
    'Hypertension / Cardiovascular',
    'Type 1 or 2 Diabetes',
    'Immunocompromised / Biologics',
    'Gastroesophageal Reflux (GERD)',
    'Motion Sickness / Vestibular',
  ];

  const toggleCondition = (cond: string) => {
    if (cond === 'None') {
      setSelectedConditions(['None']);
      return;
    }
    setSelectedConditions((prev) => {
      const filtered = prev.filter((c) => c !== 'None');
      if (filtered.includes(cond)) {
        const res = filtered.filter((c) => c !== cond);
        return res.length === 0 ? ['None'] : res;
      }
      return [...filtered, cond];
    });
  };

  const handleGenerate = () => {
    const protocol: HealthProtocol = {
      id: `prot-${Date.now()}`,
      travelerName: userProfile.name,
      destination: selectedDestObj.name,
      dates: { departure: depDate, return: retDate },
      travelStyle,
      healthProfile: {
        ageGroup,
        conditions: selectedConditions,
        allergies: allergiesInput,
        fitnessLevel,
      },
      circadianPlan: {
        daysToAdapt: selectedDestObj.circadianAdvice.recoveryDays,
        departureSleepSchedule: 'Advance bedtime by 45 minutes each evening for 3 nights pre-flight',
        inFlightHydrationTargetMl: 2500,
        destinationLightWindow: selectedDestObj.circadianAdvice.morningLight,
        melatoninSchedule: selectedDestObj.circadianAdvice.melatoninTiming,
      },
      vaccineChecklist: selectedDestObj.vaccines.mandatory.map((v) => ({
        name: v,
        required: true,
        status: hasRoutineVaccines ? 'completed' : 'needed',
      })),
      recommendedKit:
        selectedDestObj.altitudeMeters > 1500
          ? 'High-Altitude Acclimatization Kit'
          : selectedDestObj.climateRisk.humidity.includes('8')
          ? 'Tropical Biome & Gut Shield Kit'
          : 'Circadian Jet Lag Protocol Kit',
      medicalAdvisories: [
        `Altitude Advisory: ${selectedDestObj.altitudeRisk.advisory}`,
        `Water Protocol: ${selectedDestObj.waterSafety.status} - ${selectedDestObj.waterSafety.notes}`,
        `Vector Defense: ${selectedDestObj.vaccines.endemicDiseases.join(', ')}`,
        `Local Hospital Dispatch: ${selectedDestObj.hospitals[0]?.name} (${selectedDestObj.hospitals[0]?.phone})`,
      ],
      createdAt: new Date().toLocaleDateString(),
    };

    setGeneratedProtocol(protocol);
    addProtocol(protocol);
    setStep(4);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Wizard Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="label-caps text-[#7D52F4] mb-2 flex items-center justify-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5" /> Clinical Travel Planner
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
            Personalized Expedition Health Dossier
          </h1>
          <p className="text-sm text-[#484551] font-light mt-2">
            Tailored against your destination pathogen registry, flight timezones, and personal health metrics.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                    step === s
                      ? 'bg-[#3C2F80] text-white shadow-md'
                      : step > s
                      ? 'bg-[#52796F] text-white'
                      : 'bg-white border border-gray-200 text-gray-400'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 ${
                      step > s ? 'bg-[#52796F]' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 brand-shadow border border-[#3C2F80]/10">
          {/* STEP 1: Itinerary & Travel Style */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-4">
                <span className="label-caps text-[#52796F]">STEP 1 OF 3</span>
                <h3 className="text-xl font-light text-[#121026] mt-1">
                  Trip Destination &amp; Dates
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-caps text-[#484551] block mb-2">Target Destination</label>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  >
                    {DESTINATIONS_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-2">Expedition Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  >
                    <option value="Wellness Retreat & Cultural Walks">Wellness Retreat &amp; Cultural Walks</option>
                    <option value="High-Altitude Trekking (>2,500m)">High-Altitude Trekking (&gt;2,500m)</option>
                    <option value="Tropical Rainforest / Safari Expedition">Tropical Rainforest / Safari Expedition</option>
                    <option value="Digital Nomad & Extended Urban Work">Digital Nomad &amp; Extended Urban Work</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-2">Departure Embarkation</label>
                  <input
                    type="date"
                    value={depDate}
                    onChange={(e) => setDepDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-2">Return Disembarkation</label>
                  <input
                    type="date"
                    value={retDate}
                    onChange={(e) => setRetDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  />
                </div>
              </div>

              {/* Destination preview preview */}
              <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10 flex items-center gap-4">
                <img
                  src={selectedDestObj.heroImage}
                  alt={selectedDestObj.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#121026]">{selectedDestObj.name}</div>
                  <div className="text-[#797582]">{selectedDestObj.tagline}</div>
                  <div className="text-[#52796F] font-semibold mt-1">
                    Elevation: {selectedDestObj.altitudeMeters}m • Health Score: {selectedDestObj.overallHealthScore}/100
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-8 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center gap-2 shadow-md"
                >
                  <span>Continue to Health Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Health Profile & Conditions */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-4">
                <span className="label-caps text-[#52796F]">STEP 2 OF 3</span>
                <h3 className="text-xl font-light text-[#121026] mt-1">
                  Traveler Health Profile &amp; Risk Factors
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-caps text-[#484551] block mb-2">Age Bracket</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  >
                    <option value="18 - 29 years">18 - 29 years</option>
                    <option value="30 - 45 years">30 - 45 years</option>
                    <option value="46 - 64 years">46 - 64 years</option>
                    <option value="65+ years">65+ years (Senior Traveler)</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-2">Physical Stamina</label>
                  <select
                    value={fitnessLevel}
                    onChange={(e) => setFitnessLevel(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                  >
                    <option value="High (Athletic / Endurance Trekker)">High (Athletic / Endurance Trekker)</option>
                    <option value="Moderate (10,000 steps daily)">Moderate (10,000 steps daily)</option>
                    <option value="Sedentary (Low step count / Joint limitations)">Sedentary (Low step count / Joint limitations)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-2">
                  Existing Medical Conditions (Multi-select)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {conditionOptions.map((cond) => {
                    const active = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => toggleCondition(cond)}
                        className={`p-3 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition ${
                          active
                            ? 'bg-[#EBF3EE] border-[#52796F] text-[#012D25]'
                            : 'bg-[#FCF8FF] border-gray-200 text-[#484551] hover:border-[#7D52F4]'
                        }`}
                      >
                        <span>{cond}</span>
                        {active && <Check className="w-4 h-4 text-[#52796F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1.5">
                  Documented Drug &amp; Food Allergies
                </label>
                <input
                  type="text"
                  value={allergiesInput}
                  onChange={(e) => setAllergiesInput(e.target.value)}
                  placeholder="e.g. Penicillin, Sulfa antibiotics, Peanuts, Latex"
                  className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm text-[#121026] focus:border-[#7D52F4] outline-none"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-6 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-3 px-8 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center gap-2 shadow-md"
                >
                  <span>Next: Medications &amp; Vaccines</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Vaccines & Logistics */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-4">
                <span className="label-caps text-[#52796F]">STEP 3 OF 3</span>
                <h3 className="text-xl font-light text-[#121026] mt-1">
                  Vaccines &amp; Medication Transport
                </h3>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => setHasRoutineVaccines(!hasRoutineVaccines)}
                  className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-200 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#121026]">Routine Immunizations Up-to-Date</div>
                    <div className="text-xs text-[#797582] mt-0.5">MMR, Tdap booster within last 10 years, Polio series.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasRoutineVaccines}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#3C2F80] cursor-pointer"
                  />
                </div>

                <div
                  onClick={() => setNeedsDailyMeds(!needsDailyMeds)}
                  className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-200 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#121026]">Carrying Daily Prescription Drugs</div>
                    <div className="text-xs text-[#797582] mt-0.5">
                      Requires physician cross-border attestation letter and INN generic labels.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={needsDailyMeds}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#3C2F80] cursor-pointer"
                  />
                </div>

                <div
                  onClick={() => setRequiresColdChainMeds(!requiresColdChainMeds)}
                  className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-200 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#121026]">Cold-Chain Temperature Sensitive (Insulin, Biologics)</div>
                    <div className="text-xs text-[#797582] mt-0.5">
                      Requires TSA liquid cooling pouch exemption and airline notification.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requiresColdChainMeds}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#3C2F80] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-6 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="py-3 px-8 rounded-full bg-[#52796F] hover:bg-[#1C433B] text-white text-xs font-semibold transition flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Synthesize Clinical Protocol</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Generated Protocol Results */}
          {step === 4 && generatedProtocol && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Protocol Header */}
              <div className="bg-[#261569] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#87AFA4] font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4" /> CLINICAL PROTOCOL CERTIFIED
                  </div>
                  <h3 className="text-2xl font-light text-white">
                    {generatedProtocol.destination} Expedition Dossier
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    Prepared for: {generatedProtocol.travelerName} • Dates: {depDate} to {retDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPrintModal(true)}
                    className="py-2.5 px-4 rounded-full bg-white text-[#261569] text-xs font-semibold hover:bg-gray-100 transition flex items-center gap-1.5 shadow"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Dossier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Protocol saved to traveler cloud vault.', 'success');
                      navigateTo('dashboard');
                    }}
                    className="py-2.5 px-4 rounded-full bg-[#7D52F4] text-white text-xs font-semibold hover:bg-[#6636dc] transition"
                  >
                    Apply to Dashboard →
                  </button>
                </div>
              </div>

              {/* Protocol Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Circadian Plan */}
                <div className="p-6 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10 space-y-3">
                  <div className="label-caps text-[#7D52F4] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Circadian Shift Schedule
                  </div>
                  <div className="text-xs text-[#121026] space-y-2">
                    <div>
                      <span className="font-semibold">Adaptation Period:</span> {generatedProtocol.circadianPlan.daysToAdapt} days
                    </div>
                    <div>
                      <span className="font-semibold">Pre-Flight Sleep:</span> {generatedProtocol.circadianPlan.departureSleepSchedule}
                    </div>
                    <div>
                      <span className="font-semibold">Target Morning Photic Light:</span> {generatedProtocol.circadianPlan.destinationLightWindow}
                    </div>
                    <div>
                      <span className="font-semibold">Pineal Melatonin:</span> {generatedProtocol.circadianPlan.melatoninSchedule}
                    </div>
                  </div>
                </div>

                {/* Recommended Kit */}
                <div className="p-6 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10 space-y-3">
                  <div className="label-caps text-[#52796F] flex items-center gap-1.5">
                    <Package className="w-4 h-4" /> Prescribed Travel Kit
                  </div>
                  <div className="text-xs text-[#121026]">
                    <div className="font-semibold text-sm text-[#3C2F80] mb-1">
                      {generatedProtocol.recommendedKit}
                    </div>
                    <p className="text-[#797582] font-light leading-relaxed">
                      Pre-packaged with clinical dosages of electrolytes, chronobiological supplements, and localized pathogen barrier shields.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigateTo('wellness-kit')}
                      className="mt-3 text-xs font-semibold text-[#52796F] hover:underline flex items-center gap-1"
                    >
                      View Kit Specifications &amp; Order →
                    </button>
                  </div>
                </div>
              </div>

              {/* Pre-Departure Medical Timeline */}
              <div className="space-y-4">
                <h4 className="label-caps text-[#121026]">Pre-Departure Clinical Countdown</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-gray-100 bg-white flex items-start gap-4">
                    <div className="px-3 py-1 rounded bg-[#EBF3EE] text-[#52796F] font-bold text-xs shrink-0">
                      T-30 Days
                    </div>
                    <div className="text-xs text-[#484551]">
                      Schedule clinical consultation for {selectedDestObj.vaccines.recommended.join(', ')}. Validate international evacuation insurance.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-white flex items-start gap-4">
                    <div className="px-3 py-1 rounded bg-[#F0EBFF] text-[#3C2F80] font-bold text-xs shrink-0">
                      T-7 Days
                    </div>
                    <div className="text-xs text-[#484551]">
                      Obtain doctor attestation letter for personal medications. Request 90-day supply in original labelled pharmacy bottles.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-white flex items-start gap-4">
                    <div className="px-3 py-1 rounded bg-amber-50 text-amber-800 font-bold text-xs shrink-0">
                      T-48 Hours
                    </div>
                    <div className="text-xs text-[#484551]">
                      Begin shifting bed hour by 45 minutes toward destination meridian. Hydrate 2.5L daily with mineral electrolytes.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-white flex items-start gap-4">
                    <div className="px-3 py-1 rounded bg-rose-50 text-rose-700 font-bold text-xs shrink-0">
                      Flight Day
                    </div>
                    <div className="text-xs text-[#484551]">
                      Don graduated compression socks (15-20 mmHg). Consume 250ml water per flight hour. Set watch to {selectedDestObj.name} time upon takeoff.
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset or Replan */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-6 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Edit Inputs
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('checklist')}
                  className="py-2.5 px-6 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition"
                >
                  Sync to Checklist →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Printable Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-[#121026]">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="label-caps text-[#52796F]">VOYAGE WELLNESS COMPASS</div>
                  <h3 className="text-xl font-light">Official Clinical Itinerary Dossier</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-sm font-semibold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50">
                  <div>
                    <span className="font-semibold block text-gray-500">Traveler:</span>
                    {userProfile.name}
                  </div>
                  <div>
                    <span className="font-semibold block text-gray-500">Blood Group &amp; Allergies:</span>
                    {userProfile.bloodType} • {allergiesInput || 'None listed'}
                  </div>
                  <div>
                    <span className="font-semibold block text-gray-500">Destination:</span>
                    {selectedDestObj.name} ({selectedDestObj.country})
                  </div>
                  <div>
                    <span className="font-semibold block text-gray-500">Dates:</span>
                    {depDate} to {retDate}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="font-semibold text-sm text-[#3C2F80] mb-2">Emergency Hospital Dispatch</div>
                  <div>{selectedDestObj.hospitals[0]?.name}</div>
                  <div className="text-gray-500">{selectedDestObj.hospitals[0]?.address}</div>
                  <div className="font-semibold mt-1">Telephone: {selectedDestObj.hospitals[0]?.phone}</div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="font-semibold text-sm text-[#3C2F80] mb-2">Prescribed Circadian Protocol</div>
                  <div>Morning Light Exposure: {selectedDestObj.circadianAdvice.morningLight}</div>
                  <div>Evening Protocol: {selectedDestObj.circadianAdvice.eveningWindDown}</div>
                  <div>Melatonin Dosing: {selectedDestObj.circadianAdvice.melatoninTiming}</div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    showToast('Opening print dialog...', 'info');
                  }}
                  className="flex-1 py-3 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Send to Printer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="px-6 py-3 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
