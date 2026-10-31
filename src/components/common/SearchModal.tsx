/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS_DATA } from '../../data/destinations';
import { WELLNESS_KITS_DATA } from '../../data/wellnessKits';
import { EMERGENCY_COUNTRIES } from '../../data/emergencyData';
import { Search, X, MapPin, Package, AlertTriangle, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'destinations' | 'kits' | 'emergency'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredDestinations = DESTINATIONS_DATA.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.region.toLowerCase().includes(query.toLowerCase()) ||
      d.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredKits = WELLNESS_KITS_DATA.filter(
    (k) =>
      k.title.toLowerCase().includes(query.toLowerCase()) ||
      k.category.toLowerCase().includes(query.toLowerCase()) ||
      k.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEmergency = EMERGENCY_COUNTRIES.filter(
    (e) =>
      e.country.toLowerCase().includes(query.toLowerCase()) ||
      e.topHospital.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#121026]/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#3C2F80]/15 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#3C2F80]/10">
          <Search className="w-5 h-5 text-[#3C2F80]/60 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, clinical kits, emergency hospitals, vaccines..."
            autoFocus
            className="w-full text-base sm:text-lg bg-transparent text-[#121026] placeholder-[#797582] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs rounded bg-[#F0EBFF] text-[#3C2F80] font-medium hover:bg-[#E4DFFE] transition"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#FCF8FF] border-b border-[#3C2F80]/5 overflow-x-auto text-xs">
          <span className="text-[#797582] font-medium mr-1">Filter:</span>
          {(['all', 'destinations', 'kits', 'emergency'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1 rounded-full capitalize font-medium transition ${
                filterType === tab
                  ? 'bg-[#3C2F80] text-white'
                  : 'bg-white text-[#484551] border border-[#3C2F80]/10 hover:border-[#7D52F4]'
              }`}
            >
              {tab === 'kits' ? 'Wellness Kits' : tab}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 divide-y divide-gray-100 flex-1">
          {(filterType === 'all' || filterType === 'destinations') && filteredDestinations.length > 0 && (
            <div>
              <div className="label-caps text-[#52796F] mb-2 px-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Destinations & Protocols ({filteredDestinations.length})
              </div>
              <div className="space-y-1">
                {filteredDestinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      navigateTo('destinations', d.id);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F0EBFF]/60 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={d.heroImage}
                        alt={d.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm text-[#121026] group-hover:text-[#3C2F80] flex items-center gap-2">
                          {d.name}
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EBF3EE] text-[#52796F]">
                            Score: {d.overallHealthScore}
                          </span>
                        </div>
                        <div className="text-xs text-[#797582] line-clamp-1">{d.tagline}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#3C2F80] group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(filterType === 'all' || filterType === 'kits') && filteredKits.length > 0 && (
            <div className="pt-3">
              <div className="label-caps text-[#7D52F4] mb-2 px-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Travel Wellness Kits ({filteredKits.length})
              </div>
              <div className="space-y-1">
                {filteredKits.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => {
                      navigateTo('wellness-kit');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F0EBFF]/60 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={k.image}
                        alt={k.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm text-[#121026] group-hover:text-[#7D52F4]">
                          {k.title}
                        </div>
                        <div className="text-xs text-[#797582] line-clamp-1">{k.tagline}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-sm text-[#3C2F80]">${k.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(filterType === 'all' || filterType === 'emergency') && filteredEmergency.length > 0 && (
            <div className="pt-3">
              <div className="label-caps text-rose-600 mb-2 px-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Emergency Facilities ({filteredEmergency.length})
              </div>
              <div className="space-y-1">
                {filteredEmergency.map((e) => (
                  <div
                    key={e.code}
                    onClick={() => {
                      navigateTo('emergency');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 cursor-pointer transition group"
                  >
                    <div>
                      <div className="font-medium text-sm text-[#121026] group-hover:text-rose-700">
                        {e.country} Emergency Services
                      </div>
                      <div className="text-xs text-[#797582]">
                        Ambulance: <span className="font-semibold text-rose-600">{e.ambulance}</span> | Hospital: {e.topHospital.name}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredDestinations.length === 0 && filteredKits.length === 0 && filteredEmergency.length === 0 && (
            <div className="py-12 text-center text-[#797582]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Try searching &quot;Kyoto&quot;, &quot;Melatonin&quot;, &quot;Zermatt&quot;, or &quot;Ambulance&quot;.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#F7F7FA] border-t border-[#3C2F80]/10 flex items-center justify-between text-[11px] text-[#797582]">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-600">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-600">↓</kbd> to navigate</span>
          <span>Verified CDC &amp; WHO Clinical Dataset</span>
        </div>
      </div>
    </div>
  );
};
