/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WellnessKitItem } from '../types';

export const WELLNESS_KITS_DATA: WellnessKitItem[] = [
  {
    id: 'circadian-reset',
    title: 'Circadian Jet Lag Protocol Kit',
    tagline: 'Rapid pineal gland resynchronization & deep REM restorative travel sleep',
    category: 'Jet Lag',
    price: 68,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    description:
      'Engineered by neuro-chronobiologists to eliminate trans-meridian desynchronosis. Regulates cortisol curves, accelerates phase advancement across >6 time zones, and optimizes cellular hydration on long-haul flights.',
    includedItems: [
      'Micro-dosed Melatonin (0.5mg sublingual quick-dissolve, 30 tablets)',
      'Cheated Magnesium Glycinate & L-Theanine calm formulation (60 capsules)',
      'Medical-grade 100% Light-Blocking 3D Contoured Eye Mask with zero eye-socket pressure',
      'Ultra-dense Bio-Electrolyte Osmotic Hydration Packets (10 sachets)',
      'Circadian Phase-Shifting Blue Light Blocking Shades (500nm cutoff)',
    ],
    medicalAdvisory:
      'Take 0.5mg melatonin 30 minutes before target destination bed hour. Avoid caffeine 8 hours prior to sleep onset.',
    dosageSchedule: 'Initiate 24 hours prior to departure; continue for 3 nights upon arrival.',
  },
  {
    id: 'high-altitude',
    title: 'High-Altitude Acclimatization Kit',
    tagline: 'Hypobaric hypoxia resilience, oxygen uptake, and barometric headache relief',
    category: 'Altitude',
    price: 84,
    rating: 4.8,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Formulated for ascents above 2,000 meters in the Swiss Alps, Peruvian Andes, or Rocky Mountains. Supports peripheral vasodilation, reduces pulmonary arterial pressure, and provides instant SpO2 biometric monitoring.',
    includedItems: [
      'Digital LED Fingertip Pulse Oximeter with SpO2 and perfusion index tracker',
      'Standardized Ginkgo Biloba & Rhodiola Rosea adaptogenic extracts',
      'Concentrated Ginger & Peppermint anti-nausea chews',
      'Electrolyte Osmolyte Matrix with bioavailable potassium and sodium citrate',
      'SPF 50+ Zinc Oxide Alpine Sun & Lip Defense Barrier',
    ],
    medicalAdvisory:
      'Ascend no more than 500m of sleep elevation per 24h above 3,000m. If SpO2 drops below 80% with dyspnea, immediate descent is required.',
    dosageSchedule: 'Take adaptogen blend twice daily starting 4 days before ascent.',
  },
  {
    id: 'tropical-defense',
    title: 'Tropical Biome & Gut Shield Kit',
    tagline: 'Broad-spectrum vector barrier, microbiome armor, and rapid rehydration',
    category: 'Tropical',
    price: 76,
    rating: 4.95,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
    description:
      'Essential clinical defense for Southeast Asia, Central America, and equatorial regions. Shields against Aedes aegypti mosquitoes (dengue vector) while fortifying the intestinal lining against pathogenic enterobacteria.',
    includedItems: [
      '20% Picaridin Micro-Encapsulated 12-Hour Insect Barrier Spray (100ml TSA-compliant)',
      'Shelf-stable Saccharomyces boulardii & Lactobacillus rhamnosus GG (30 billion CFU)',
      'Activated Coconut Charcoal detoxifying absorbent capsules',
      'WHO-Formula Oral Rehydration Salts (ORS) with zinc sulfate',
      'Water purification tablets (Troclosene Sodium - treats 50L in 30 mins)',
    ],
    medicalAdvisory:
      'Apply insect repellent after sunscreen has fully absorbed. In case of acute gastroenteritis, maintain 200ml ORS per loose movement.',
    dosageSchedule: 'Take probiotic 1 capsule daily with morning meal throughout travel.',
  },
  {
    id: 'flight-circulation',
    title: 'Long-Haul Flight Recovery Kit',
    tagline: 'Deep vein thrombosis prevention, mucosal hydration, and sensory isolation',
    category: 'Flight',
    price: 54,
    rating: 4.85,
    reviewsCount: 267,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    description:
      'Designed to counter cabin altitude pressure (equivalent to 1,800m-2,400m) and arid 10% relative humidity. Prevents lower limb edema, dry eye keratitis, and viral respiratory transmission in recycled airflow.',
    includedItems: [
      'Graduated Medical Compression Socks (15-20 mmHg certified circulation support)',
      'Hypertonic Sea Water Sterile Nasal Spray with aloe vera & ectoin',
      'Preservative-free Carmellose Sodium ocular hydrating drops (20 single vials)',
      'Antimicrobial Silver-Infused Copper Travel Face Mask',
      'Precision Pressure-Regulating Aviation Ear Plugs with micro-valves',
    ],
    medicalAdvisory:
      'Perform seated calf pumps every 45 minutes during flights exceeding 4 hours. Stay hydrated with 250ml water per flight hour.',
    dosageSchedule: 'Don compression socks prior to boarding; use nasal spray every 3 hours aloft.',
  },
  {
    id: 'extreme-weather',
    title: 'Subarctic & Extreme Cold Defense',
    tagline: 'Epidermal lipid barrier restoration, thermal regulation, and immune support',
    category: 'Extreme Weather',
    price: 62,
    rating: 4.75,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Formulated for Iceland, Lapland, Patagonia, and subzero alpine expeditions. Counteracts severe transepidermal water loss, windburn, peripheral vasoconstriction, and seasonal subarctic immune dips.',
    includedItems: [
      'Ceramide & Squalane High-Potency Lipid Barrier Repair Balm',
      'Vitamin D3 (5,000 IU) + K2 Sublingual Drops (60 doses)',
      'Reusable Iron-Activated Non-Toxic Pocket Hand & Foot Warmers (4-pack)',
      'Eucalyptus & Siberian Fir Essential Oil Nasal Inhaler stick',
      'Electrolyte Balance Matrix with warmth-activating ginger root extract',
    ],
    medicalAdvisory:
      'Never rub frost-nipped skin. Apply lipid barrier balm 20 minutes before stepping into subzero winds.',
    dosageSchedule: 'Apply balm to exposed face twice daily; take Vitamin D3 with morning breakfast.',
  },
];
