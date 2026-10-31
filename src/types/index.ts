/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'destinations'
  | 'dashboard'
  | 'planner'
  | 'checklist'
  | 'wellness-kit'
  | 'emergency'
  | 'about';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  tagline: string;
  description: string;
  heroImage: string;
  coordinates: string;
  timezone: string;
  utcOffset: number; // e.g. +9
  altitudeMeters: number;
  overallHealthScore: number; // 0-100
  waterSafety: {
    status: 'Safe' | 'Bottled Recommended' | 'Strict Purification Needed';
    rating: 'safe' | 'caution' | 'danger';
    notes: string;
  };
  airQuality: {
    aqi: number;
    rating: 'Pristine' | 'Moderate' | 'Sensitive' | 'Unhealthy';
    pm25: string;
    primaryAllergen: string;
  };
  climateRisk: {
    uvIndex: number;
    humidity: string;
    tempRange: string;
    heatStressRisk: 'Low' | 'Moderate' | 'High';
  };
  altitudeRisk: {
    riskLevel: 'None' | 'Mild' | 'Moderate' | 'Severe';
    advisory: string;
  };
  vaccines: {
    mandatory: string[];
    recommended: string[];
    endemicDiseases: string[];
  };
  healthAlerts: Array<{
    id: string;
    level: 'Info' | 'Advisory' | 'Warning';
    title: string;
    summary: string;
    date: string;
  }>;
  hospitals: Array<{
    name: string;
    address: string;
    phone: string;
    englishProficient: boolean;
    traumaCenter: boolean;
    distance: string;
  }>;
  circadianAdvice: {
    direction: 'East' | 'West' | 'Neutral';
    recoveryDays: number;
    morningLight: string;
    eveningWindDown: string;
    melatoninTiming: string;
  };
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: 'Medications' | 'Vaccines' | 'Circadian & Sleep' | 'Gear & Environment' | 'Documents';
  priority: 'High' | 'Medium' | 'Low';
  packed: boolean;
  notes?: string;
  tsaCompliant?: boolean;
}

export interface WellnessKitItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Jet Lag' | 'Altitude' | 'Tropical' | 'Flight' | 'Extreme Weather';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  includedItems: string[];
  medicalAdvisory: string;
  dosageSchedule: string;
}

export interface HealthProtocol {
  id: string;
  travelerName: string;
  destination: string;
  dates: {
    departure: string;
    return: string;
  };
  travelStyle: string;
  healthProfile: {
    ageGroup: string;
    conditions: string[];
    allergies: string;
    fitnessLevel: string;
  };
  circadianPlan: {
    daysToAdapt: number;
    departureSleepSchedule: string;
    inFlightHydrationTargetMl: number;
    destinationLightWindow: string;
    melatoninSchedule: string;
  };
  vaccineChecklist: Array<{ name: string; required: boolean; status: 'completed' | 'needed' }>;
  recommendedKit: string;
  medicalAdvisories: string[];
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  homeTimezone: string;
  homeCity: string;
  bloodType: string;
  allergies: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurancePolicy: string;
  savedDestinations: string[];
  activeProtocols: HealthProtocol[];
}

export interface EmergencyCountryInfo {
  country: string;
  code: string;
  police: string;
  ambulance: string;
  fire: string;
  universalSos?: string;
  usEmbassy: {
    name: string;
    address: string;
    phone: string;
    emergency24h: string;
  };
  euConsulate: {
    name: string;
    address: string;
    phone: string;
  };
  topHospital: {
    name: string;
    city: string;
    phone: string;
    address: string;
    englishSpoken: boolean;
  };
  poisonControl: string;
  waterAdvisory: string;
}
