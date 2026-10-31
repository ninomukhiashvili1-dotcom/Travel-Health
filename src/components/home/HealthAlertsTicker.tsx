/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Info, Bell, X, ArrowRight } from 'lucide-react';

interface AlertItem {
  id: string;
  region: string;
  severity: 'Warning' | 'Advisory' | 'Info';
  headline: string;
  recommendation: string;
  date: string;
}

const GLOBAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    region: 'Central America & Caribbean',
    severity: 'Warning',
    headline: 'Seasonal Dengue Surge (Serotype 3)',
    recommendation: 'Rigorous 20% Picaridin barrier application at dawn and dusk. Avoid standing freshwater pools.',
    date: 'Active Bulletin',
  },
  {
    id: 'alt-2',
    region: 'European Alpine Passes (>2,500m)',
    severity: 'Advisory',
    headline: 'High Snow Albedo UV Index (8+)',
    recommendation: 'Snow surface doubles retinal UV flux. Polarized Cat 4 glacier eyewear mandatory.',
    date: 'Monitored',
  },
  {
    id: 'alt-3',
    region: 'East Africa Savannah',
    severity: 'Warning',
    headline: 'Malaria Prophylaxis Enforcement',
    recommendation: 'Atovaquone-proguanil or Doxycycline required for rural safari corridors.',
    date: 'Active Bulletin',
  },
  {
    id: 'alt-4',
    region: 'East Asia Urban Corridors',
    severity: 'Info',
    headline: 'Cryptomeria Spring Pollen Dispersal',
    recommendation: 'Micro-filtration masks and non-drowsy antihistamines recommended for outdoor walks.',
    date: 'Seasonal Notice',
  },
];

export const HealthAlertsTicker: React.FC = () => {
  const { navigateTo } = useApp();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const activeAlerts = GLOBAL_ALERTS.filter((a) => !dismissed.includes(a.id));

  return (
    <section className="py-12 bg-white border-y border-[#3C2F80]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="label-caps text-rose-600 font-semibold tracking-wider">
              REAL-TIME GLOBAL EPIDEMIOLOGICAL FEED
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('emergency')}
            className="text-xs text-[#7D52F4] font-semibold hover:underline flex items-center gap-1"
          >
            Emergency Center <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/15 hover:border-[#7D52F4] cursor-pointer transition relative group flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDismissed((prev) => [...prev, alert.id]);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 transition opacity-0 group-hover:opacity-100"
                title="Dismiss Alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      alert.severity === 'Warning'
                        ? 'bg-rose-100 text-rose-700'
                        : alert.severity === 'Advisory'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-[11px] text-[#797582] truncate">{alert.region}</span>
                </div>

                <h4 className="text-xs font-semibold text-[#121026] line-clamp-1 mb-1">
                  {alert.headline}
                </h4>
                <p className="text-[11px] text-[#484551] font-light line-clamp-2">
                  {alert.recommendation}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-[#7D52F4] font-medium flex items-center justify-between">
                <span>{alert.date}</span>
                <span className="group-hover:underline">View Advice →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing detailed alert */}
        {selectedAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full brand-shadow-lg border border-[#3C2F80]/20 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedAlert.severity === 'Warning'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedAlert.severity} Advisory
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedAlert(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="label-caps text-[#797582]">{selectedAlert.region}</div>
                <h3 className="text-xl font-medium text-[#121026] mt-1">{selectedAlert.headline}</h3>
              </div>

              <div className="p-4 rounded-xl bg-[#FCF8FF] border border-[#3C2F80]/10 text-xs text-[#484551] leading-relaxed">
                <div className="font-semibold text-[#121026] mb-1">Clinical Protocol:</div>
                {selectedAlert.recommendation}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAlert(null);
                    navigateTo('planner');
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition"
                >
                  Build Protective Travel Plan
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAlert(null)}
                  className="py-2.5 px-4 rounded-full border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
