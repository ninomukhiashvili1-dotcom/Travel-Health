/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Sun, Moon, Droplets, Zap, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface CityOption {
  code: string;
  name: string;
  offset: number;
}

const CITIES: CityOption[] = [
  { code: 'LHR', name: 'London (UTC+0)', offset: 0 },
  { code: 'JFK', name: 'New York (UTC-5)', offset: -5 },
  { code: 'SFO', name: 'San Francisco (UTC-8)', offset: -8 },
  { code: 'HND', name: 'Tokyo (UTC+9)', offset: 9 },
  { code: 'ZRH', name: 'Zurich (UTC+1)', offset: 1 },
  { code: 'DXB', name: 'Dubai (UTC+4)', offset: 4 },
  { code: 'SIN', name: 'Singapore (UTC+8)', offset: 8 },
  { code: 'SYD', name: 'Sydney (UTC+11)', offset: 11 },
  { code: 'SJO', name: 'San José Costa Rica (UTC-6)', offset: -6 },
];

export const JetLagCalculator: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [originCode, setOriginCode] = useState('LHR');
  const [destCode, setDestCode] = useState('HND');
  const [flightDurationHours, setFlightDurationHours] = useState(13);
  const [departureWindow, setDepartureWindow] = useState<'morning' | 'afternoon' | 'redeye'>('afternoon');
  const [savedToProfile, setSavedToProfile] = useState(false);

  const origin = CITIES.find((c) => c.code === originCode) || CITIES[0];
  const dest = CITIES.find((c) => c.code === destCode) || CITIES[3];

  let rawDiff = dest.offset - origin.offset;
  if (rawDiff > 12) rawDiff -= 24;
  if (rawDiff < -12) rawDiff += 24;

  const absDiff = Math.abs(rawDiff);
  const isEastward = rawDiff > 0;
  // Eastward travel typically takes ~1 day per hour, Westward ~0.7 days per hour
  const adaptationDays = Math.max(1, Math.round(isEastward ? absDiff * 0.9 : absDiff * 0.6));
  const hydrationGoal = Math.round(flightDurationHours * 250);

  const handleApply = () => {
    setSavedToProfile(true);
    showToast(`Circadian Protocol applied for ${origin.name} → ${dest.name}!`, 'success');
    setTimeout(() => setSavedToProfile(false), 3000);
  };

  return (
    <section className="py-20 bg-[#F7F7FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="label-caps text-[#7D52F4] mb-2 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Chronobiological Precision
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
            The Circadian Jet Lag Optimizer
          </h2>
          <p className="text-sm sm:text-base text-[#484551] font-light mt-3 leading-relaxed">
            Trans-meridian flights disturb the pineal suprachiasmatic nucleus. Enter your flight coordinates to generate a mathematical phase-shift schedule.
          </p>
        </div>

        {/* Interactive Engine Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 brand-shadow border border-[#3C2F80]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="label-caps text-[#484551] block mb-1.5">Departure Port (Origin)</label>
                <select
                  value={originCode}
                  onChange={(e) => setOriginCode(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c.code} value={c.code} disabled={c.code === destCode}>
                      {c.name} — {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1.5">Arrival Port (Destination)</label>
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#3C2F80]/15 bg-[#FCF8FF] text-sm font-medium text-[#121026] focus:border-[#7D52F4] outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c.code} value={c.code} disabled={c.code === originCode}>
                      {c.name} — {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="label-caps text-[#484551]">Flight Duration Aloft</label>
                  <span className="text-xs font-semibold text-[#3C2F80]">{flightDurationHours} hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="19"
                  step="1"
                  value={flightDurationHours}
                  onChange={(e) => setFlightDurationHours(Number(e.target.value))}
                  className="w-full accent-[#3C2F80] cursor-pointer"
                />
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1.5">Flight Timing</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['morning', 'afternoon', 'redeye'] as const).map((win) => (
                    <button
                      key={win}
                      type="button"
                      onClick={() => setDepartureWindow(win)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium capitalize border transition ${
                        departureWindow === win
                          ? 'bg-[#3C2F80] text-white border-[#3C2F80]'
                          : 'bg-[#FCF8FF] text-[#484551] border-gray-200 hover:border-[#7D52F4]'
                      }`}
                    >
                      {win === 'redeye' ? 'Red-Eye Night' : win}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 py-3 px-5 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-md"
              >
                {savedToProfile ? <Check className="w-4 h-4 text-emerald-300" /> : <Clock className="w-4 h-4" />}
                <span>{savedToProfile ? 'Protocol Active' : 'Save Protocol to Dashboard'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="py-3 px-4 rounded-full border border-[#3C2F80]/20 hover:bg-[#F0EBFF] text-[#3C2F80] text-xs font-semibold transition"
              >
                Full Dashboard →
              </button>
            </div>
          </div>

          {/* Real-time Mathematical Output Display */}
          <div className="lg:col-span-7 bg-[#FCF8FF] rounded-2xl p-6 sm:p-8 border border-[#3C2F80]/10 space-y-6">
            {/* Top Metric Gauges */}
            <div className="grid grid-cols-3 gap-3 pb-6 border-b border-[#3C2F80]/10 text-center">
              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="label-caps text-[#797582]">Time Shift</div>
                <div className="text-2xl font-light text-[#3C2F80] mt-1">
                  {rawDiff >= 0 ? `+${rawDiff}` : rawDiff} hrs
                </div>
                <div className="text-[10px] text-[#52796F] font-semibold mt-0.5">
                  {isEastward ? 'Phase Advance (Harder)' : 'Phase Delay'}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="label-caps text-[#797582]">Adaptation Window</div>
                <div className="text-2xl font-light text-[#7D52F4] mt-1">
                  {adaptationDays} {adaptationDays === 1 ? 'Day' : 'Days'}
                </div>
                <div className="text-[10px] text-gray-500 font-medium mt-0.5">Without protocol: {absDiff + 1}d</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="label-caps text-[#797582]">In-Flight Hydration</div>
                <div className="text-2xl font-light text-[#52796F] mt-1">{hydrationGoal} ml</div>
                <div className="text-[10px] text-gray-500 font-medium mt-0.5">250ml / flight hour</div>
              </div>
            </div>

            {/* Actionable Phase-Shift Schedule */}
            <div className="space-y-3.5">
              <h4 className="label-caps text-[#121026] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7D52F4]" /> Tailored Circadian Prescription
              </h4>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#121026]">Morning Photic Window (High Lux Exposure)</div>
                  <div className="text-xs text-[#484551] mt-0.5 font-light">
                    {isEastward
                      ? 'Seek outdoor natural sunlight 07:30 AM – 09:30 AM local time immediately upon arrival. Suppresses residual melatonin secretion.'
                      : 'Delay morning light exposure until 10:00 AM; wear dark sunglasses during early dawn walks.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Moon className="w-5 h-5 text-[#3C2F80] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#121026]">Pineal Melatonin Synchronization</div>
                  <div className="text-xs text-[#484551] mt-0.5 font-light">
                    Take 0.5mg – 1mg sublingual melatonin at 22:00 local destination hour for 3 consecutive nights. Avoid screens 90 minutes before bed.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Droplets className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#121026]">Arid Cabin Osmotic Balance</div>
                  <div className="text-xs text-[#484551] mt-0.5 font-light">
                    Aircraft cabins maintain ~10% humidity. Consume 2 electrolyte sachets in 500ml water before boarding and midpoint aloft.
                  </div>
                </div>
              </div>
            </div>

            {/* Link to kit */}
            <div className="p-3.5 rounded-xl bg-[#EBF3EE] border border-[#52796F]/20 flex items-center justify-between text-xs">
              <span className="text-[#012D25] font-medium">
                Need melatonin, blue-blocker shades &amp; electrolytes?
              </span>
              <button
                type="button"
                onClick={() => navigateTo('wellness-kit')}
                className="text-[#52796F] font-semibold hover:underline flex items-center gap-1"
              >
                View Circadian Kit <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
