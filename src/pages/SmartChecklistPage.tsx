/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChecklistItem } from '../types';
import {
  Luggage,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  RotateCcw,
  Download,
  Filter,
  ShieldCheck,
  AlertCircle,
  Plane,
  Sparkles,
} from 'lucide-react';

export const SmartChecklistPage: React.FC = () => {
  const {
    checklistItems,
    toggleChecklistItem,
    addChecklistItem,
    removeChecklistItem,
    resetChecklist,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ChecklistItem['category']>('Medications');
  const [newPriority, setNewPriority] = useState<ChecklistItem['priority']>('High');

  const categories = [
    'All',
    'Medications',
    'Vaccines',
    'Circadian & Sleep',
    'Gear & Environment',
    'Documents',
  ];

  const total = checklistItems.length;
  const packedCount = checklistItems.filter((i) => i.packed).length;
  const progressPercent = Math.round((packedCount / (total || 1)) * 100);

  const filteredItems = checklistItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    return matchesCat && matchesPriority;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please specify an item title.', 'warning');
      return;
    }
    addChecklistItem(newTitle.trim(), newCategory, newPriority);
    setNewTitle('');
    setShowAddModal(false);
  };

  const handleExport = () => {
    const textContent = checklistItems
      .map(
        (item) =>
          `[${item.packed ? 'X' : ' '}] ${item.title} (${item.category} - ${item.priority} Priority)\nNotes: ${item.notes || 'N/A'}`
      )
      .join('\n\n');

    const blob = new Blob([`VOYAGE WELLNESS COMPASS — PACKING LIST\nCompletion: ${progressPercent}%\n\n${textContent}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voyage-travel-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    showToast('Packing checklist exported successfully!', 'success');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label-caps text-[#52796F] mb-2 flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5" /> Clinical Preparation Checklist
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
              Smart Travel &amp; Medical Checklist
            </h1>
            <p className="text-sm text-[#484551] font-light mt-1">
              Physician-curated essentials with TSA liquid compliance and prescription protocols.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="py-2.5 px-4 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Item</span>
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="py-2.5 px-4 rounded-full bg-white border border-[#3C2F80]/15 text-[#121026] hover:bg-gray-50 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#7D52F4]" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={resetChecklist}
              className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
              title="Reset to default items"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Progress Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 brand-shadow border border-[#3C2F80]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="label-caps text-[#7D52F4]">READINESS METRIC</div>
              <div className="text-2xl font-light text-[#121026] mt-0.5">
                {packedCount} of {total} Items Secured
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-light text-[#3C2F80]">{progressPercent}%</span>
              <div className="text-[10px] text-[#52796F] font-semibold">
                {progressPercent === 100
                  ? 'Expedition Fully Prepared'
                  : `${total - packedCount} Items Remaining`}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3C2F80] via-[#7D52F4] to-[#52796F] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* TSA Notice */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-[#797582]">
            <Plane className="w-4 h-4 text-[#3C2F80] shrink-0" />
            <span>
              TSA Rule 3-1-1 Exemption: Medically necessary liquids, sprays, and injectables (e.g. insulin, eye drops) are exempt from the 100ml limit when declared at checkpoint.
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition ${
                  activeCategory === cat
                    ? 'bg-[#3C2F80] text-white shadow-sm'
                    : 'bg-white text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#797582] font-semibold">Priority:</span>
            <button
              type="button"
              onClick={() => setPriorityFilter(priorityFilter === 'All' ? 'High' : 'All')}
              className={`px-3 py-1 rounded-full font-medium border transition ${
                priorityFilter === 'High'
                  ? 'bg-rose-100 border-rose-300 text-rose-800 font-bold'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              {priorityFilter === 'High' ? 'High Priority Only' : 'All Priorities'}
            </button>
          </div>
        </div>

        {/* Checklist Items Container */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 group ${
                item.packed
                  ? 'bg-[#FCF8FF] border-gray-200/80 opacity-70'
                  : 'bg-white border-[#3C2F80]/15 hover:border-[#7D52F4] brand-shadow'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  className="mt-0.5 text-gray-400 group-hover:text-[#3C2F80] transition"
                >
                  {item.packed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#52796F] fill-[#EBF3EE]" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-medium ${
                        item.packed ? 'line-through text-gray-400' : 'text-[#121026]'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-[10px] bg-[#F0EBFF] text-[#3C2F80] font-medium px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-[#797582] font-light leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChecklistItem(item.id);
                  }}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#52796F]" />
              <p className="text-sm">No items found for this filter criteria.</p>
            </div>
          )}
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full brand-shadow-lg border border-[#3C2F80]/15 space-y-4 animate-in zoom-in-95 duration-150">
              <h3 className="text-lg font-light text-[#121026]">Add Custom Packing Item</h3>

              <form onSubmit={handleCreateItem} className="space-y-4">
                <div>
                  <label className="label-caps text-[#484551] block mb-1">Item Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Asthma Inhaler (Ventolin) + Spacer"
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-[#7D52F4] outline-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ChecklistItem['category'])}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-[#7D52F4] outline-none"
                  >
                    <option value="Medications">Medications</option>
                    <option value="Vaccines">Vaccines</option>
                    <option value="Circadian & Sleep">Circadian &amp; Sleep</option>
                    <option value="Gear & Environment">Gear &amp; Environment</option>
                    <option value="Documents">Documents</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#484551] block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as ChecklistItem['priority'])}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-[#7D52F4] outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#3C2F80] text-white text-xs font-semibold hover:bg-[#261569] transition shadow"
                  >
                    Add to Checklist
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
