/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_COUNTRIES, FIRST_AID_GUIDES } from '../data/emergencyData';
import {
  ShieldAlert,
  Phone,
  Building2,
  Globe2,
  AlertOctagon,
  CreditCard,
  QrCode,
  Download,
  Share2,
  HelpCircle,
  CheckCircle2,
  Droplets,
  Search,
} from 'lucide-react';

export const EmergencyCenterPage: React.FC = () => {
  const { userProfile, updateUserProfile, showToast } = useApp();

  const [selectedCountryCode, setSelectedCountryCode] = useState('JP');
  const [activeGuideTab, setActiveGuideTab] = useState(0);

  // Medical ID form state
  const [bloodType, setBloodType] = useState(userProfile.bloodType);
  const [allergies, setAllergies] = useState(userProfile.allergies);
  const [contactName, setContactName] = useState(userProfile.emergencyContact.name);
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact.phone);
  const [insurance, setInsurance] = useState(userProfile.insurancePolicy);
  const [idCardSaved, setIdCardSaved] = useState(false);

  const currentCountry =
    EMERGENCY_COUNTRIES.find((c) => c.code === selectedCountryCode) || EMERGENCY_COUNTRIES[0];

  const handleSaveMedicalId = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      bloodType,
      allergies,
      insurancePolicy: insurance,
      emergencyContact: {
        ...userProfile.emergencyContact,
        name: contactName,
        phone: contactPhone,
      },
    });
    setIdCardSaved(true);
    showToast('Digital Medical ID Card updated and cached offline.', 'success');
    setTimeout(() => setIdCardSaved(false), 3000);
  };

  const handleDownloadId = () => {
    window.print();
    showToast('Printing Digital Medical ID Card...', 'info');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Urgent Emergency Banner */}
        <div className="bg-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" /> 24/7 GLOBAL SOS DISPATCH
            </div>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight">
              Emergency Center &amp; Hospital Triage
            </h1>
            <p className="text-xs sm:text-sm text-white/90 font-light max-w-xl">
              Tap-to-call emergency numbers, accredited English-speaking hospitals, consular rescue lines, and offline digital medical records.
            </p>
          </div>

          {/* Quick Country Switcher */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col gap-1.5 shrink-0">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
              Select Immediate Location:
            </label>
            <select
              value={selectedCountryCode}
              onChange={(e) => {
                setSelectedCountryCode(e.target.value);
                showToast(`Emergency directory set to ${e.target.value}`, 'info');
              }}
              className="bg-white text-[#121026] p-2.5 rounded-xl font-semibold text-sm outline-none cursor-pointer"
            >
              {EMERGENCY_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.country} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rapid Dial Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ambulance */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-rose-100 flex flex-col justify-between">
            <div>
              <div className="label-caps text-rose-600">MEDICAL AMBULANCE</div>
              <div className="text-3xl font-light text-[#121026] mt-1">{currentCountry.ambulance}</div>
              <p className="text-xs text-[#797582] mt-1">Direct emergency paramedic triage</p>
            </div>
            <a
              href={`tel:${currentCountry.ambulance}`}
              onClick={() => showToast(`Dialing ambulance ${currentCountry.ambulance}...`, 'info')}
              className="mt-4 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Tap to Call ({currentCountry.ambulance})</span>
            </a>
          </div>

          {/* Police */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="label-caps text-[#3C2F80]">POLICE DISPATCH</div>
              <div className="text-3xl font-light text-[#121026] mt-1">{currentCountry.police}</div>
              <p className="text-xs text-[#797582] mt-1">Law enforcement &amp; public safety</p>
            </div>
            <a
              href={`tel:${currentCountry.police}`}
              onClick={() => showToast(`Dialing police ${currentCountry.police}...`, 'info')}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Tap to Call ({currentCountry.police})</span>
            </a>
          </div>

          {/* Fire / Universal */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="label-caps text-amber-600">FIRE &amp; RESCUE</div>
              <div className="text-3xl font-light text-[#121026] mt-1">{currentCountry.fire}</div>
              <p className="text-xs text-[#797582] mt-1">Universal SOS: {currentCountry.universalSos}</p>
            </div>
            <a
              href={`tel:${currentCountry.fire}`}
              onClick={() => showToast(`Dialing fire/rescue ${currentCountry.fire}...`, 'info')}
              className="mt-4 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Tap to Call ({currentCountry.fire})</span>
            </a>
          </div>

          {/* Poison Control */}
          <div className="bg-white rounded-3xl p-6 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between">
            <div>
              <div className="label-caps text-[#52796F]">POISON TOX CENTER</div>
              <div className="text-xl font-light text-[#121026] mt-1 truncate">
                {currentCountry.poisonControl}
              </div>
              <p className="text-xs text-[#797582] mt-1">Bites, plant toxins &amp; chemicals</p>
            </div>
            <a
              href={`tel:${currentCountry.poisonControl}`}
              onClick={() => showToast(`Dialing poison control...`, 'info')}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#52796F] hover:bg-[#1C433B] text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call Poison Hotline</span>
            </a>
          </div>
        </div>

        {/* Consular & Tertiary Hospital Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accredited Hospital */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#3C2F80]" />
              <h3 className="text-lg font-light text-[#121026]">
                Premier International Hospital Triage
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-base text-[#121026]">
                    {currentCountry.topHospital.name}
                  </h4>
                  <p className="text-xs text-[#797582]">{currentCountry.topHospital.city}</p>
                </div>
                {currentCountry.topHospital.englishSpoken && (
                  <span className="px-2.5 py-1 rounded-full bg-[#EBF3EE] text-[#52796F] text-[10px] font-bold">
                    English Speaking Staff
                  </span>
                )}
              </div>

              <div className="text-xs text-[#484551] leading-relaxed">
                <span className="font-semibold text-[#121026]">Address:</span> {currentCountry.topHospital.address}
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href={`tel:${currentCountry.topHospital.phone}`}
                  onClick={() => showToast(`Calling ${currentCountry.topHospital.name}`, 'info')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hospital ({currentCountry.topHospital.phone})</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
              <span className="font-semibold">Local Water Advisory:</span> {currentCountry.waterAdvisory}
            </div>
          </div>

          {/* Embassy & Consular Assistance */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10 space-y-4">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#52796F]" />
              <h3 className="text-lg font-light text-[#121026]">
                Diplomatic &amp; Consular Hotlines
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-100 space-y-2">
                <div className="font-semibold text-xs text-[#121026]">
                  {currentCountry.usEmbassy.name} (24/7 Citizen Emergency)
                </div>
                <div className="text-xs text-[#797582]">{currentCountry.usEmbassy.address}</div>
                <div className="pt-1">
                  <a
                    href={`tel:${currentCountry.usEmbassy.emergency24h}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7D52F4] font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>24h Hotline: {currentCountry.usEmbassy.emergency24h}</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-gray-100 space-y-2">
                <div className="font-semibold text-xs text-[#121026]">
                  {currentCountry.euConsulate.name}
                </div>
                <div className="text-xs text-[#797582]">{currentCountry.euConsulate.address}</div>
                <div className="pt-1">
                  <a
                    href={`tel:${currentCountry.euConsulate.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#52796F] font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Phone: {currentCountry.euConsulate.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Emergency Medical ID Card Generator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 brand-shadow border border-[#3C2F80]/10 space-y-8">
          <div>
            <div className="label-caps text-[#7D52F4] mb-1">OFFLINE TRAVELER WALLET</div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#121026]">
              Digital Emergency Medical ID Card
            </h2>
            <p className="text-xs sm:text-sm text-[#484551] font-light mt-1">
              Provides first responders with critical blood type, allergy contraindications, and emergency contacts even with zero cellular connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The Visual Medical ID Card (High-Contrast Red/Slate) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#121026] to-[#261569] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center font-bold text-xs">
                    +
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-rose-400">
                      EMERGENCY MEDICAL IDENTIFICATION
                    </div>
                    <div className="text-xs text-white/70">Voyage Wellness Compass</div>
                  </div>
                </div>

                <QrCode className="w-10 h-10 text-white/90" />
              </div>

              <div>
                <div className="text-2xl font-medium tracking-tight text-white">{userProfile.name}</div>
                <div className="text-xs text-white/75 mt-0.5">Passport Traveler Record</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block">Blood Group</span>
                  <span className="text-base font-semibold text-rose-300">{bloodType}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block">Allergies / Alert</span>
                  <span className="text-xs font-semibold text-amber-300 line-clamp-1">{allergies || 'None'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/60 block">Emergency Contact</span>
                <div className="font-semibold">{contactName}</div>
                <div className="text-white/80">{contactPhone}</div>
              </div>

              <div className="text-[10px] text-white/50 flex justify-between items-center border-t border-white/15 pt-3">
                <span>Policy: {insurance}</span>
                <span>Active 2026-2027</span>
              </div>
            </div>

            {/* Form to update ID card */}
            <div className="lg:col-span-6 space-y-4">
              <form onSubmit={handleSaveMedicalId} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Blood Type</label>
                    <input
                      type="text"
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Drug / Food Allergies</label>
                    <input
                      type="text"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-1">Medical Evacuation Insurance Policy #</label>
                  <input
                    type="text"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{idCardSaved ? 'Saved to Wallet' : 'Update & Save Medical ID'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadId}
                    className="py-3 px-6 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print Card</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Clinical First Aid Guides */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 brand-shadow border border-[#3C2F80]/10 space-y-6">
          <div>
            <div className="label-caps text-[#52796F] mb-1">FIELD CLINICAL TRIAGE</div>
            <h2 className="text-2xl font-light text-[#121026]">
              Wilderness &amp; Travel First-Aid Protocols
            </h2>
          </div>

          {/* Guide Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            {FIRST_AID_GUIDES.map((guide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGuideTab(idx)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                  activeGuideTab === idx
                    ? 'bg-[#3C2F80] text-white shadow'
                    : 'bg-[#FCF8FF] text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
                }`}
              >
                {guide.condition}
              </button>
            ))}
          </div>

          {/* Active Guide Content */}
          <div className="p-6 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#121026]">
                {FIRST_AID_GUIDES[activeGuideTab].condition}
              </h3>
              <div className="text-xs text-[#797582] mt-1">
                <span className="font-semibold text-gray-700">Warning Symptoms:</span>{' '}
                {FIRST_AID_GUIDES[activeGuideTab].symptoms}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-200/60">
              <div className="label-caps text-[#52796F]">Clinical Immediate Steps:</div>
              {FIRST_AID_GUIDES[activeGuideTab].actionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-[#121026]">
                  <span className="w-5 h-5 rounded-full bg-[#EBF3EE] text-[#52796F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
