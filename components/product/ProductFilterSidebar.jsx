'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Check, RotateCcw, ChevronDown } from 'lucide-react';

/**
 * Clean E-Commerce Product Filter Sidebar Component
 * @param {{
 *   categories: Array<{ id: number, name: string, slug: string }>,
 *   currentFilters: {
 *     q?: string,
 *     category?: string,
 *     minPrice?: string,
 *     maxPrice?: string,
 *     stockStatus?: string,
 *     sort?: string
 *   },
 *   onFilterChange: (newFilters: object) => void,
 *   onResetAll: () => void
 * }} props
 */
export default function ProductFilterSidebar({
  categories = [],
  currentFilters = {},
  onFilterChange,
  onResetAll
}) {
  const [searchInput, setSearchInput] = useState(currentFilters.q || '');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync search input if currentFilters.q changes externally
  useEffect(() => {
    setSearchInput(currentFilters.q || '');
  }, [currentFilters.q]);

  // Debounced search (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if ((searchInput || '') !== (currentFilters.q || '')) {
        onFilterChange({ q: searchInput.trim() || undefined, page: 1 });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, currentFilters.q, onFilterChange]);

  const handlePriceSelect = (rangeValue) => {
    let minPrice;
    let maxPrice;

    if (rangeValue === 'under-50k') {
      maxPrice = 50000;
    } else if (rangeValue === '50k-100k') {
      minPrice = 50000;
      maxPrice = 100000;
    } else if (rangeValue === '100k-500k') {
      minPrice = 100000;
      maxPrice = 500000;
    } else if (rangeValue === 'above-500k') {
      minPrice = 500000;
    }

    onFilterChange({
      minPrice,
      maxPrice,
      page: 1
    });
  };

  const getSelectedPriceRange = () => {
    const min = currentFilters.minPrice ? Number(currentFilters.minPrice) : null;
    const max = currentFilters.maxPrice ? Number(currentFilters.maxPrice) : null;

    if (!min && max === 50000) return 'under-50k';
    if (min === 50000 && max === 100000) return '50k-100k';
    if (min === 100000 && max === 500000) return '100k-500k';
    if (min === 500000 && !max) return 'above-500k';
    return '';
  };

  const activeCount = [
    currentFilters.category,
    currentFilters.minPrice || currentFilters.maxPrice,
    currentFilters.stockStatus,
    currentFilters.q
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6 font-sans">
      {/* Search Input */}
      <div>
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2.5">
          Pencarian
        </h4>
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/50 text-charcoal text-xs font-medium focus:outline-none focus:border-terracotta focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-warm-gray absolute left-3 top-3" />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="absolute right-2.5 top-2.5 text-warm-gray hover:text-charcoal p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Section */}
      <div className="pt-5 border-t border-light-beige/70">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
          Kategori Produk
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onFilterChange({ category: undefined, page: 1 })}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
              !currentFilters.category
                ? 'bg-terracotta/10 text-terracotta font-bold'
                : 'text-warm-gray hover:text-charcoal hover:bg-soft-beige'
            }`}
          >
            <span>Semua Kategori</span>
            {!currentFilters.category && <Check className="w-3.5 h-3.5 text-terracotta" />}
          </button>

          {categories.map((c) => {
            const isSelected = currentFilters.category === c.slug;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onFilterChange({ category: c.slug, page: 1 })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-terracotta/10 text-terracotta font-bold'
                    : 'text-warm-gray hover:text-charcoal hover:bg-soft-beige'
                }`}
              >
                <span>{c.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-5 border-t border-light-beige/70">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
          Rentang Harga
        </h4>
        <div className="space-y-1.5">
          {[
            { id: '', label: 'Semua Harga' },
            { id: 'under-50k', label: 'Di bawah Rp50.000' },
            { id: '50k-100k', label: 'Rp50.000 – Rp100.000' },
            { id: '100k-500k', label: 'Rp100.000 – Rp500.000' },
            { id: 'above-500k', label: 'Di atas Rp500.000' }
          ].map((item) => {
            const isSelected = getSelectedPriceRange() === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePriceSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-terracotta/10 text-terracotta font-bold border border-terracotta/20'
                    : 'text-warm-gray hover:text-charcoal hover:bg-soft-beige'
                }`}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability Filter */}
      <div className="pt-5 border-t border-light-beige/70">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
          Ketersediaan
        </h4>
        <div className="space-y-1.5">
          {[
            { id: '', label: 'Semua Status' },
            { id: 'available', label: 'Tersedia' },
            { id: 'limited', label: 'Stok Terbatas' },
            { id: 'out-of-stock', label: 'Habis' }
          ].map((item) => {
            const isSelected = (currentFilters.stockStatus || '') === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilterChange({ stockStatus: item.id || undefined, page: 1 })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-terracotta/10 text-terracotta font-bold border border-terracotta/20'
                    : 'text-warm-gray hover:text-charcoal hover:bg-soft-beige'
                }`}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Action */}
      {activeCount > 0 && (
        <div className="pt-5 border-t border-light-beige/70">
          <button
            type="button"
            onClick={onResetAll}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-terracotta/30 text-terracotta hover:bg-terracotta/10 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Filter</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Persistent Left Column) */}
      <aside className="hidden lg:block bg-white p-5 rounded-2xl border border-light-beige shadow-subtle sticky top-24">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-light-beige">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-terracotta" />
            <h3 className="font-sans font-bold text-sm text-charcoal">
              Filter Katalog
            </h3>
          </div>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-terracotta text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </div>

        <FilterContent />
      </aside>

      {/* Mobile Drawer Trigger Button */}
      <div className="block lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-light-beige shadow-xs text-xs font-bold text-charcoal hover:bg-warm-ivory transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-terracotta" />
            <span>Filter &amp; Pencarian Katalog</span>
          </div>
          <div className="flex items-center space-x-2">
            {activeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-terracotta text-white text-[10px] font-bold">
                {activeCount} aktif
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-warm-gray" />
          </div>
        </button>
      </div>

      {/* Mobile Side Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/60 backdrop-blur-xs lg:hidden">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-light-beige shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-light-beige bg-warm-ivory">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-terracotta" />
                <h3 className="font-sans font-bold text-base text-charcoal">
                  Filter Katalog
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-warm-gray hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <FilterContent />
            </div>

            <div className="p-4 border-t border-light-beige bg-warm-ivory flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Lihat Hasil Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
