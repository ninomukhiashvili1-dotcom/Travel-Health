/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Award,
  ShieldCheck,
  Stethoscope,
  Globe2,
  Mail,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { showToast } = useApp();

  // Contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Clinical Consultation');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const team = [
    {
      name: 'Dr. Aris Thorne, MD, DTM&H',
      role: 'Chief Medical Officer & Expedition Physician',
      bio: 'Former consultant at the London School of Hygiene & Tropical Medicine. Specializes in high-altitude hypobaric pathophysiology and vector-borne arboviruses.',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dr. Soraya Hadad, PhD',
      role: 'Head of Chronobiology & Circadian Science',
      bio: 'Lead researcher in pineal photic synchronization and suprachiasmatic nucleus rhythms. Advises commercial aviation flight crews on trans-meridian fatigue.',
      avatar: 'https://images.unsplash.com/photo-1594824813627-2c974c935d25?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marcus Vance, EMT-P',
      role: 'Director of Global MedEvac Logistics',
      bio: '20+ years coordinating international air ambulance evacuations and remote alpine mountain rescue operations across Europe and the Himalayas.',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How does the Circadian Jet Lag Optimizer calculate photic light windows?',
      a: 'The algorithm models the human suprachiasmatic nucleus (SCN) phase-response curve (PRC). Based on flight direction and timezone shift, it identifies the precise hours when retinal blue-spectrum lux either advances or delays your biological master clock, paired with micro-dosed melatonin (0.5mg) onset.',
    },
    {
      q: 'Are the medical facility and hospital numbers verified?',
      a: 'Yes. Our clinical registry monitors tertiary accredited facilities (JCI-accredited where available) with validated English-language emergency triage desks and 24/7 trauma departments.',
    },
    {
      q: 'Can the Digital Emergency Medical ID work without internet access?',
      a: 'Yes. The digital card utilizes local browser storage and responsive client rendering, enabling offline display of your blood type, chronic conditions, and emergency contacts in any remote corner of the world.',
    },
    {
      q: 'What makes the Travel Wellness Kits different from standard first aid kits?',
      a: 'Standard kits contain adhesive bandages and cotton gauze. Voyage Wellness Kits are physician-curated with targeted physiological agents: micro-dosed sublingual melatonin, high-potency osmotic electrolytes, clinical-grade 20% picaridin insect shields, and pulse oximeters.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }
    setFormSent(true);
    showToast('Your medical inquiry has been received. Our clinical team will respond within 24h.', 'success');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Story Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="label-caps text-[#52796F] flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> The Voyage Compass Philosophy
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#121026]">
            Bridging Expedition Medicine &amp; Travel Tech
          </h1>
          <p className="text-sm sm:text-base text-[#484551] font-light leading-relaxed">
            Founded by expedition physicians and chronobiologists who believe global discovery should elevate, not drain, human physiology. We translate complex epidemiological data into effortless daily travel protocols.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/20 flex items-center justify-center text-[#3C2F80]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-[#121026]">ISTM Clinical Standards</h3>
            <p className="text-xs text-[#484551] font-light leading-relaxed">
              Every vaccine recommendation and endemic alert aligns with International Society of Travel Medicine guidelines and WHO data streams.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/20 flex items-center justify-center text-[#7D52F4]">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-[#121026]">Zero-Slop Precision</h3>
            <p className="text-xs text-[#484551] font-light leading-relaxed">
              We never present synthetic hallucinations as medical data. Real coordinates, real hospital dispatch numbers, and tested physiological formulas.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 brand-shadow border border-[#3C2F80]/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/20 flex items-center justify-center text-[#52796F]">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-[#121026]">194 Sovereign Nations</h3>
            <p className="text-xs text-[#484551] font-light leading-relaxed">
              From the high-altitude glaciers of Zermatt to the subarctic thermal waters of Iceland and the dense canopy corridors of Arenal.
            </p>
          </div>
        </div>

        {/* Medical Advisory Board */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="label-caps text-[#7D52F4] mb-1">CLINICAL GOVERNANCE</div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#121026]">
              Medical Advisory Board
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden brand-shadow border border-[#3C2F80]/10 flex flex-col"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-[#121026]">{member.name}</h4>
                    <p className="text-xs text-[#7D52F4] font-medium">{member.role}</p>
                    <p className="text-xs text-[#484551] font-light mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 brand-shadow border border-[#3C2F80]/10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="label-caps text-[#52796F] mb-1">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="text-2xl font-light text-[#121026]">Scientific &amp; Practical Details</h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-medium text-sm text-[#121026] flex items-center justify-between bg-[#FCF8FF] hover:bg-[#F0EBFF] transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#3C2F80]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs text-[#484551] font-light leading-relaxed bg-white border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Contact Us Form */}
        <div className="bg-gradient-to-br from-[#FCF8FF] to-[#F0EBFF] rounded-3xl p-6 sm:p-10 border border-[#3C2F80]/15 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="label-caps text-[#3C2F80] mb-1">CONNECT WITH OUR CLINICIANS</div>
            <h2 className="text-2xl font-light text-[#121026]">Inquiries &amp; Medical Consultations</h2>
            <p className="text-xs text-[#797582] mt-1">
              Have questions regarding specific expedition routes or pharmaceutical cold-chain logistics?
            </p>
          </div>

          {formSent ? (
            <div className="p-8 rounded-2xl bg-white border border-[#52796F]/30 text-center space-y-3 max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-[#52796F] mx-auto" />
              <h4 className="text-lg font-medium text-[#121026]">Message Dispatched</h4>
              <p className="text-xs text-[#484551]">
                Thank you, {name}. Our medical advisory desk will review your inquiry and follow up at {email}.
              </p>
              <button
                type="button"
                onClick={() => setFormSent(false)}
                className="mt-4 px-6 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@voyagecompass.io"
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1">Inquiry Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                >
                  <option value="Clinical Consultation">Clinical Itinerary Review</option>
                  <option value="Vaccination & Malaria Questions">Vaccination &amp; Malaria Chemoprophylaxis</option>
                  <option value="Wellness Kit Customization">Wellness Kit Order Customization</option>
                  <option value="Corporate / Expedition Partnership">Corporate / Expedition Partnership</option>
                </select>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your upcoming itinerary, terrain specifics, or health concerns..."
                  className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-md mx-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Medical Desk</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
