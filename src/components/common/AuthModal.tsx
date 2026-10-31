/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, UserCheck, Key, Lock, Mail, User, Compass } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, isLoggedIn, loginDemoUser, logoutUser, userProfile, updateUserProfile, showToast } =
    useApp();
  const [mode, setMode] = useState<'signin' | 'signup' | 'profile'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState(userProfile.bloodType);
  const [allergies, setAllergies] = useState(userProfile.allergies);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'profile') {
      updateUserProfile({ bloodType, allergies });
      setIsAuthModalOpen(false);
      return;
    }
    if (mode === 'signup') {
      updateUserProfile({ name: name || 'Explorer', email: email || 'traveler@voyagecompass.io' });
    }
    loginDemoUser();
    showToast(mode === 'signup' ? 'Traveler account created and synchronized.' : 'Logged in successfully.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121026]/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#3C2F80]/15 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#261569] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-[#87AFA4]" />
            <span className="label-caps tracking-widest text-[#87AFA4]">VOYAGE HEALTH VAULT</span>
          </div>
          <h3 className="text-xl font-light tracking-tight">
            {isLoggedIn
              ? 'Traveler Biometric Profile'
              : mode === 'signin'
              ? 'Sign In to Your Compass'
              : 'Create Expeditioner Dossier'}
          </h3>
          <p className="text-xs text-white/70 mt-1">
            {isLoggedIn
              ? 'Manage your clinical health records and saved itineraries.'
              : 'Sync cross-border medical certificates, jet lag schedules, and emergency cards.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FCF8FF] border border-[#3C2F80]/10">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#7D52F4]"
                />
                <div>
                  <h4 className="font-medium text-base text-[#121026]">{userProfile.name}</h4>
                  <p className="text-xs text-[#797582]">{userProfile.email}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#52796F] mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Biometrics Synchronized
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Blood Type</label>
                  <input
                    type="text"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#3C2F80]/15 text-sm focus:border-[#7D52F4] focus:ring-1 focus:ring-[#7D52F4] outline-none"
                    placeholder="e.g. A Rh-Positive"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Known Allergies / Contradictions</label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#3C2F80]/15 text-sm focus:border-[#7D52F4] focus:ring-1 focus:ring-[#7D52F4] outline-none"
                    placeholder="e.g. Penicillin, Shellfish"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Emergency Contact</label>
                  <div className="p-3 rounded-xl bg-gray-50 text-xs text-[#121026]">
                    <span className="font-semibold">{userProfile.emergencyContact.name}</span> ({userProfile.emergencyContact.relationship})
                    <div className="text-gray-500 mt-0.5">{userProfile.emergencyContact.phone}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    updateUserProfile({ bloodType, allergies });
                    setIsAuthModalOpen(false);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition shadow-md"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="py-3 px-4 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Full Legal Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#3C2F80]/15 text-sm focus:border-[#7D52F4] outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="label-caps text-[#484551] block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@voyagecompass.io"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#3C2F80]/15 text-sm focus:border-[#7D52F4] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="label-caps text-[#484551] block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#3C2F80]/15 text-sm focus:border-[#7D52F4] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#3C2F80] text-white text-xs font-semibold tracking-wide hover:bg-[#261569] transition shadow-md"
              >
                {mode === 'signin' ? 'Sign In & Access Records' : 'Create Free Health Account'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white px-2 text-gray-400 font-semibold tracking-wider">Or Instant Demo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={loginDemoUser}
                className="w-full py-2.5 rounded-full bg-[#F0EBFF] text-[#3C2F80] hover:bg-[#E4DFFE] text-xs font-semibold transition flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-[#7D52F4]" />
                Continue with Demo Profile (Elena Rostova)
              </button>

              <div className="text-center pt-2">
                {mode === 'signin' ? (
                  <p className="text-xs text-gray-500">
                    New to Voyage Compass?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[#7D52F4] font-semibold hover:underline"
                    >
                      Create an account
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-[#3C2F80] font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
