/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WellnessKitItem } from '../types';
import {
  Sparkles,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Clock,
  X,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';

export const WellnessKitPage: React.FC = () => {
  const { wellnessKits, addToCart, cartKits, removeFromCart, clearCart, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedKit, setSelectedKit] = useState<WellnessKitItem | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Checkout form
  const [shipName, setShipName] = useState('Elena Rostova');
  const [shipAddress, setShipAddress] = useState('14 Berkeley Square, Mayfair, London W1J 6BL');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');

  const categories = ['All', 'Jet Lag', 'Altitude', 'Tropical', 'Flight', 'Extreme Weather'];

  const filteredKits =
    activeCategory === 'All'
      ? wellnessKits
      : wellnessKits.filter((k) => k.category === activeCategory);

  const totalCartCount = cartKits.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cartKits.reduce((acc, curr) => {
    const kit = wellnessKits.find((k) => k.id === curr.kitId);
    return acc + (kit ? kit.price * curr.quantity : 0);
  }, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    showToast('Order confirmed! Clinical kit dispatched via DHL Medical Express.', 'success');
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      setShowCheckoutModal(false);
    }, 4000);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Cart Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label-caps text-[#7D52F4] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Physician-Formulated Formulations
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#121026]">
              Travel Wellness &amp; Medical Kits
            </h1>
            <p className="text-sm text-[#484551] font-light mt-1 max-w-xl">
              Micro-dosed chronobiotics, TSA-approved barrier formulations, and osmotic electrolytes engineered for extreme terrain and cabin pressures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (totalCartCount === 0) {
                  showToast('Your kit order pack is empty. Add a kit below!', 'info');
                } else {
                  setShowCheckoutModal(true);
                }
              }}
              className="py-3 px-6 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-[#87AFA4]" />
              <span>Travel Pack ({totalCartCount} items — ${totalCartPrice})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? 'bg-[#3C2F80] text-white shadow-sm'
                  : 'bg-white text-[#484551] border border-gray-200 hover:border-[#7D52F4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKits.map((kit) => (
            <div
              key={kit.id}
              className="bg-white rounded-3xl overflow-hidden brand-shadow border border-[#3C2F80]/10 hover:border-[#7D52F4]/40 transition flex flex-col justify-between group"
            >
              <div>
                {/* Visual */}
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={kit.image}
                    alt={kit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#121026]/80 backdrop-blur-md text-white text-xs font-semibold">
                    {kit.category}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-[#3C2F80] text-xs font-bold shadow-md">
                    ${kit.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-semibold text-gray-800">{kit.rating}</span>
                    <span className="text-gray-400">({kit.reviewsCount} reviews)</span>
                  </div>

                  <h3 className="text-xl font-light text-[#121026] group-hover:text-[#3C2F80] transition">
                    {kit.title}
                  </h3>

                  <p className="text-xs text-[#797582] line-clamp-2 font-light">
                    {kit.tagline}
                  </p>

                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <span className="label-caps text-[#52796F] text-[10px]">What is inside:</span>
                    {kit.includedItems.slice(0, 3).map((item, i) => (
                      <div key={i} className="text-xs text-[#484551] flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#52796F] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedKit(kit)}
                  className="flex-1 py-2.5 rounded-full border border-[#3C2F80]/20 text-[#3C2F80] hover:bg-[#F0EBFF] text-xs font-semibold transition"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => addToCart(kit.id)}
                  className="flex-1 py-2.5 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal for Single Kit */}
        {selectedKit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-[#121026] animate-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="label-caps text-[#7D52F4]">{selectedKit.category}</span>
                  <h3 className="text-2xl font-light text-[#121026] mt-0.5">{selectedKit.title}</h3>
                  <div className="text-sm font-semibold text-[#3C2F80] mt-1">${selectedKit.price} USD</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedKit(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={selectedKit.image}
                alt={selectedKit.title}
                className="w-full h-52 object-cover rounded-2xl"
              />

              <p className="text-xs sm:text-sm text-[#484551] font-light leading-relaxed">
                {selectedKit.description}
              </p>

              <div className="space-y-3">
                <h4 className="label-caps text-[#52796F]">Included Formulation Components</h4>
                <div className="space-y-2">
                  {selectedKit.includedItems.map((comp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#121026] p-2.5 rounded-xl bg-gray-50">
                      <Check className="w-4 h-4 text-[#52796F] shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FCF8FF] border border-[#3C2F80]/10 text-xs text-[#484551] space-y-1">
                <div className="font-semibold text-[#121026]">Clinical Dosing &amp; Advisory:</div>
                <div>{selectedKit.medicalAdvisory}</div>
                <div className="text-[#7D52F4] font-medium pt-1">Timing: {selectedKit.dosageSchedule}</div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedKit.id);
                    setSelectedKit(null);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Travel Pack (${selectedKit.price})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-6 text-[#121026] animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="label-caps text-[#52796F]">SECURE DISPATCH</div>
                  <h3 className="text-xl font-light">Expedition Wellness Kit Order</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {orderPlaced ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EBF3EE] text-[#52796F] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-medium text-[#121026]">Order Confirmed &amp; Dispatched!</h4>
                  <p className="text-xs text-[#484551] max-w-sm mx-auto">
                    Tracking #DHL-EXP-{Math.floor(100000 + Math.random() * 900000)}. Your temperature-controlled kit will arrive in 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  {/* Cart items list */}
                  <div className="space-y-2 border-b pb-4">
                    <div className="label-caps text-[#484551]">Order Summary:</div>
                    {cartKits.map((item) => {
                      const kit = wellnessKits.find((k) => k.id === item.kitId);
                      if (!kit) return null;
                      return (
                        <div key={item.kitId} className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold">{kit.title}</span> (x{item.quantity})
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">${kit.price * item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.kitId)}
                              className="text-rose-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="pt-2 flex justify-between text-sm font-semibold text-[#3C2F80]">
                      <span>Total Amount:</span>
                      <span>${totalCartPrice} USD</span>
                    </div>
                  </div>

                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={shipAddress}
                      onChange={(e) => setShipAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#7D52F4] outline-none"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#484551] block mb-1">Dispatch Speed</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setShippingMethod('express')}
                        className={`p-2.5 rounded-xl border text-left font-medium ${
                          shippingMethod === 'express'
                            ? 'bg-[#EBF3EE] border-[#52796F] text-[#012D25]'
                            : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <div>Express 48h (Free)</div>
                        <div className="text-[10px] text-gray-500">Insulated thermal carton</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShippingMethod('standard')}
                        className={`p-2.5 rounded-xl border text-left font-medium ${
                          shippingMethod === 'standard'
                            ? 'bg-[#EBF3EE] border-[#52796F] text-[#012D25]'
                            : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <div>Airport Locker Pickup</div>
                        <div className="text-[10px] text-gray-500">LHR / JFK Terminal 5</div>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#3C2F80] hover:bg-[#261569] text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Authorize Demo Payment (${totalCartPrice})</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
