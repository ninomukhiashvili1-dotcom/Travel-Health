/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import {
  Compass,
  Search,
  Bookmark,
  User,
  Menu,
  X,
  ShieldAlert,
  Activity,
  Luggage,
  Sparkles,
  HeartPulse,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    savedDestinations,
    userProfile,
    isLoggedIn,
    setIsSearchOpen,
    setIsAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'destinations', label: 'Destinations', icon: Compass },
    { id: 'dashboard', label: 'Health Dashboard', icon: Activity },
    { id: 'planner', label: 'Travel Planner', icon: HeartPulse },
    { id: 'checklist', label: 'Smart Checklist', icon: Luggage },
    { id: 'wellness-kit', label: 'Wellness Kit', icon: Sparkles },
    { id: 'emergency', label: 'Emergency Center', icon: ShieldAlert },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#3C2F80] flex items-center justify-center text-white shadow-md group-hover:bg-[#261569] transition">
              <Compass className="w-5 h-5 text-[#87AFA4] group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-light tracking-tight text-lg text-[#121026] group-hover:text-[#3C2F80] transition">
                  EARTH VOYAGE
                </span>
                <span className="font-semibold text-lg text-[#3C2F80]">COMPASS</span>
              </div>
              <div className="label-caps text-[#52796F] text-[9px] -mt-1 hidden sm:block">
                TRAVEL HEALTH &amp; CIRCADIAN INTELLIGENCE
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#3C2F80] text-white shadow-sm'
                      : 'text-[#484551] hover:text-[#121026] hover:bg-[#F0EBFF]/70'
                  }`}
                >
                  {link.label}
                  {link.id === 'emergency' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white border border-[#3C2F80]/15 text-[#484551] hover:border-[#7D52F4] hover:text-[#3C2F80] transition flex items-center gap-2 text-xs shadow-sm"
              title="Search (Cmd + K)"
            >
              <Search className="w-4 h-4 text-[#3C2F80]" />
              <span className="hidden md:inline font-medium">Search</span>
              <kbd className="hidden md:inline text-[10px] bg-[#F0EBFF] text-[#3C2F80] px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Saved Destinations Pill */}
            <button
              onClick={() => navigateTo('dashboard')}
              className="relative p-2 rounded-full bg-white border border-[#3C2F80]/15 text-[#484551] hover:text-[#3C2F80] hover:border-[#3C2F80] transition shadow-sm"
              title="Saved Expeditions"
            >
              <Bookmark className="w-4 h-4" />
              {savedDestinations.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7D52F4] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedDestinations.length}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1 rounded-full bg-[#FCF8FF] border border-[#3C2F80]/20 hover:border-[#7D52F4] transition shadow-sm"
            >
              {isLoggedIn ? (
                <>
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#7D52F4]"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-[#121026] max-w-[90px] truncate">
                    {userProfile.name.split(' ')[0]}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-[#3C2F80]" />
                  <span className="hidden sm:inline text-xs font-semibold text-[#3C2F80]">
                    Sign In
                  </span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#121026] hover:bg-[#F0EBFF] transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#3C2F80]/15 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-[#3C2F80] text-white font-semibold'
                      : 'text-[#121026] hover:bg-[#F0EBFF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#87AFA4]' : 'text-[#3C2F80]'}`} />
                  {link.label}
                  {link.id === 'emergency' && (
                    <span className="ml-auto text-[10px] uppercase font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                      24/7 SOS
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between px-2">
              <div className="text-xs text-[#797582]">
                Signed in as <span className="font-semibold text-[#121026]">{userProfile.name}</span>
              </div>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#7D52F4] font-semibold hover:underline"
              >
                Manage Profile
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
