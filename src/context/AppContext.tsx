/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, Destination, ChecklistItem, WellnessKitItem, HealthProtocol, UserProfile } from '../types';
import { DESTINATIONS_DATA } from '../data/destinations';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/checklistData';
import { WELLNESS_KITS_DATA } from '../data/wellnessKits';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, destinationId?: string) => void;
  selectedDestination: Destination;
  setSelectedDestinationId: (id: string) => void;
  savedDestinations: string[];
  toggleSaveDestination: (id: string) => void;
  checklistItems: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (title: string, category: ChecklistItem['category'], priority: ChecklistItem['priority']) => void;
  removeChecklistItem: (id: string) => void;
  resetChecklist: () => void;
  wellnessKits: WellnessKitItem[];
  cartKits: Array<{ kitId: string; quantity: number }>;
  addToCart: (kitId: string) => void;
  removeFromCart: (kitId: string) => void;
  clearCart: () => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  loginDemoUser: () => void;
  logoutUser: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeProtocols: HealthProtocol[];
  addProtocol: (protocol: HealthProtocol) => void;
  hydrationCount: number;
  addHydration: (amountMl: number) => void;
  resetHydration: () => void;
}

const defaultProfile: UserProfile = {
  name: 'Elena Rostova',
  email: 'elena.rostova@voyagecompass.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  homeCity: 'London (LHR, UTC+0)',
  homeTimezone: 'UTC+0',
  bloodType: 'A Rh-Positive',
  allergies: 'Penicillin, Shellfish (Mild)',
  emergencyContact: {
    name: 'Dr. Marcus Vance',
    relationship: 'Partner / Primary Contact',
    phone: '+44 7700 900482',
  },
  insurancePolicy: 'Allianz Global Horizon MedEvac #AX-984210',
  savedDestinations: ['kyoto', 'zermatt', 'costa-rica'],
  activeProtocols: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedDestinationId, setSelectedDestIdState] = useState<string>('kyoto');
  const [savedDestinations, setSavedDestinations] = useState<string[]>(['kyoto', 'zermatt', 'costa-rica']);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('voyage_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST_ITEMS;
    } catch {
      return DEFAULT_CHECKLIST_ITEMS;
    }
  });

  const [cartKits, setCartKits] = useState<Array<{ kitId: string; quantity: number }>>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [activeProtocols, setActiveProtocols] = useState<HealthProtocol[]>([]);
  const [hydrationCount, setHydrationCount] = useState<number>(1250); // ml

  // Save checklist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('voyage_checklist', JSON.stringify(checklistItems));
    } catch (e) {
      console.error(e);
    }
  }, [checklistItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3800);
  };

  const selectedDestination =
    DESTINATIONS_DATA.find((d) => d.id === selectedDestinationId) || DESTINATIONS_DATA[0];

  const setSelectedDestinationId = (id: string) => {
    setSelectedDestIdState(id);
  };

  const navigateTo = (page: PageId, destinationId?: string) => {
    if (destinationId) {
      setSelectedDestIdState(destinationId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveDestination = (id: string) => {
    setSavedDestinations((prev) => {
      const isSaved = prev.includes(id);
      const dest = DESTINATIONS_DATA.find((d) => d.id === id);
      const destName = dest ? dest.name : id;
      if (isSaved) {
        showToast(`Removed ${destName} from saved expeditions.`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved ${destName} to your travel health dossier.`, 'success');
        return [...prev, id];
      }
    });
  };

  const toggleChecklistItem = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, packed: !item.packed };
          if (updated.packed) {
            showToast(`Packed: ${item.title.substring(0, 32)}...`, 'success');
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addChecklistItem = (
    title: string,
    category: ChecklistItem['category'],
    priority: ChecklistItem['priority']
  ) => {
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      title,
      category,
      priority,
      packed: false,
      tsaCompliant: true,
      notes: 'Custom traveler entry',
    };
    setChecklistItems((prev) => [newItem, ...prev]);
    showToast(`Added "${title.substring(0, 24)}..." to your checklist`, 'success');
  };

  const removeChecklistItem = (id: string) => {
    setChecklistItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Checklist item removed.', 'info');
  };

  const resetChecklist = () => {
    setChecklistItems(DEFAULT_CHECKLIST_ITEMS);
    showToast('Checklist reset to baseline clinical protocol.', 'info');
  };

  const addToCart = (kitId: string) => {
    setCartKits((prev) => {
      const existing = prev.find((item) => item.kitId === kitId);
      const kit = WELLNESS_KITS_DATA.find((k) => k.id === kitId);
      const title = kit?.title || 'Wellness Kit';
      showToast(`Added ${title} to your travel kit order!`, 'success');
      if (existing) {
        return prev.map((item) =>
          item.kitId === kitId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { kitId, quantity: 1 }];
    });
  };

  const removeFromCart = (kitId: string) => {
    setCartKits((prev) => prev.filter((item) => item.kitId !== kitId));
    showToast('Kit item removed from travel pack order.', 'info');
  };

  const clearCart = () => {
    setCartKits([]);
  };

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...partial }));
    showToast('Traveler medical profile updated.', 'success');
  };

  const loginDemoUser = () => {
    setIsLoggedIn(true);
    setUserProfile(defaultProfile);
    setIsAuthModalOpen(false);
    showToast('Welcome back, Elena. Biometric profile synced.', 'success');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setIsAuthModalOpen(false);
    showToast('Signed out of Voyage Wellness Compass.', 'info');
  };

  const addProtocol = (protocol: HealthProtocol) => {
    setActiveProtocols((prev) => [protocol, ...prev]);
    showToast(`Clinical Protocol generated for ${protocol.destination}!`, 'success');
  };

  const addHydration = (amountMl: number) => {
    setHydrationCount((prev) => {
      const next = prev + amountMl;
      showToast(`+${amountMl}ml recorded. Total: ${next}ml / 2500ml target.`, 'success');
      return next;
    });
  };

  const resetHydration = () => {
    setHydrationCount(0);
    showToast('Hydration tracker reset for new flight segment.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedDestination,
        setSelectedDestinationId,
        savedDestinations,
        toggleSaveDestination,
        checklistItems,
        toggleChecklistItem,
        addChecklistItem,
        removeChecklistItem,
        resetChecklist,
        wellnessKits: WELLNESS_KITS_DATA,
        cartKits,
        addToCart,
        removeFromCart,
        clearCart,
        userProfile,
        updateUserProfile,
        isLoggedIn,
        loginDemoUser,
        logoutUser,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast,
        activeProtocols,
        addProtocol,
        hydrationCount,
        addHydration,
        resetHydration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
