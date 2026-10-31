/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Shield, Award, Stethoscope } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Aris Thorne, MD, DTM&H',
      role: 'Clinical Fellow in Wilderness & Expedition Medicine',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      quote:
        'Voyage Compass replaces guesswork with rigorous chronobiology and ISTM guidelines. The circadian phase shifts and altitude protocols match what we prescribe in tertiary travel clinics.',
    },
    {
      name: 'Claire Chen',
      role: 'Global Design Director & 100k+ Mile Frequent Flyer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      quote:
        'Crossing 9 time zones between London and Tokyo used to cost me 4 days of brain fog. With the timed light exposure and micro-dosed melatonin protocol, I stepped off the plane completely alert.',
    },
    {
      name: 'Liam Vance',
      role: 'High-Altitude Alpine Guide (UIAGM Certified)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      quote:
        'The barometric altitude warnings and SpO2 tracking algorithms save lives on Klein Matterhorn and Torres del Paine. It is an indispensable digital companion for high-risk terrains.',
    },
  ];

  return (
    <section className="py-20 bg-[#F7F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="label-caps text-[#52796F] mb-2 flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Clinical Rigor &amp; Global Trust
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
            Endorsed by Expedition Physicians &amp; Nomads
          </h2>
          <p className="text-sm text-[#484551] font-light mt-2">
            Trusted by global travelers traversing polar ice caps, alpine glaciers, and equatorial rainforests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 brand-shadow border border-[#3C2F80]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#484551] font-light italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3C2F80]/20"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#121026]">{item.name}</h4>
                  <p className="text-xs text-[#797582] font-light">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
