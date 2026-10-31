/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out transform translate-y-0">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#121026] text-white shadow-2xl border border-[#7D52F4]/30 backdrop-blur-xl">
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#87AFA4] shrink-0" />}
        {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-[#7D52F4] shrink-0" />}
        <span className="text-xs md:text-sm font-medium tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};
