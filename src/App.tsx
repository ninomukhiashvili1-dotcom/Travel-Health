/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';

import { HomePage } from './pages/HomePage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { HealthDashboardPage } from './pages/HealthDashboardPage';
import { TravelHealthPlannerPage } from './pages/TravelHealthPlannerPage';
import { SmartChecklistPage } from './pages/SmartChecklistPage';
import { WellnessKitPage } from './pages/WellnessKitPage';
import { EmergencyCenterPage } from './pages/EmergencyCenterPage';
import { AboutUsPage } from './pages/AboutUsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#121026] selection:bg-[#7D52F4] selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'destinations' && <DestinationDetailsPage />}
        {currentPage === 'dashboard' && <HealthDashboardPage />}
        {currentPage === 'planner' && <TravelHealthPlannerPage />}
        {currentPage === 'checklist' && <SmartChecklistPage />}
        {currentPage === 'wellness-kit' && <WellnessKitPage />}
        {currentPage === 'emergency' && <EmergencyCenterPage />}
        {currentPage === 'about' && <AboutUsPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Global Overlays */}
      <SearchModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
