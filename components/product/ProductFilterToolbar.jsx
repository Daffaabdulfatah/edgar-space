'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';

/**
 * Editorial Product Filter Toolbar & Mobile Drawer
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
 *   hideCategoryFilter?: boolean,
 *   onFilterChange: (newFilters: object) => void
 * }} props 
 */
export default function ProductFilterToolbar({
  categories = [],
  currentFilters = {},
  hideCategoryFilter = false,
  onFilterChange
}) {
  const [searchInput, setSearchInput] = useState(currentFilters.q || '');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync search input if currentFilters.q changes externally (e.g. back button or reset)
  useEffect(() => {
    setSearchInput(currentFilters.q || '');
  }, [currentFilters.q]);

  // Debounced search input (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if ((searchInput || '') !== (currentFilters.q || '')) {
        onFilterChange({ q: searchInput.trim() || undefined, page: 1 });
      }
    }, 350);

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

  // Count active filter criteria
  const activeCount = [
    currentFilters.category,
    currentFilters.minPrice || currentFilters.maxPrice,
    currentFilters.stockStatus,
    currentFilters.sort && currentFilters.sort !== 'newest'
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Main Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-light-beige shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari produk..."
            aria-label="Cari produk"
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/40 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-deep-olive focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-warm-gray absolute left-3 top-3" />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="absolute right-2.5 top-2.5 text-warm-gray hover:text-charcoal p-0.5"
              aria-label="Hapus kata kunci pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filter Dropdowns */}
        <div className="hidden lg:flex items-center space-x-2.5">
          {/* Category Filter */}
          {!hideCategoryFilter && (
            <select
              value={currentFilters.category || ''}
              onChange={(e) => onFilterChange({ category: e.target.value || undefined, page: 1 })}
              aria-label="Filter berdasarkan kategori"
              className="px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs font-medium focus:outline-none focus:border-deep-olive cursor-pointer"
            >
              <option value="">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {/* Price Range Filter */}
          <select
            value={getSelectedPriceRange()}
            onChange={(e) => handlePriceSelect(e.target.value)}
            aria-label="Filter berdasarkan rentang harga"
            className="px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs font-medium focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="">Semua Harga</option>
            <option value="under-50k">Di bawah Rp50.000</option>
            <option value="50k-100k">Rp50.000 – Rp100.000</option>
            <option value="100k-500k">Rp100.000 – Rp500.000</option>
            <option value="above-500k">Di atas Rp500.000</option>
          </select>

          {/* Stock Status Filter */}
          <select
            value={currentFilters.stockStatus || ''}
            onChange={(e) => onFilterChange({ stockStatus: e.target.value || undefined, page: 1 })}
            aria-label="Filter berdasarkan status stok"
            className="px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs font-medium focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="">Semua Ketersediaan</option>
            <option value="available">Tersedia</option>
            <option value="limited">Stok Terbatas</option>
            <option value="out-of-stock">Habis</option>
          </select>

          {/* Sort Filter */}
          <select
            value={currentFilters.sort || 'newest'}
            onChange={(e) => onFilterChange({ sort: e.target.value, page: 1 })}
            aria-label="Urutkan produk"
            className="px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs font-medium focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="name-asc">Nama A–Z</option>
            <option value="name-desc">Nama Z–A</option>
          </select>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex lg:hidden items-center justify-between gap-2">
          {/* Quick Sort on Mobile */}
          <select
            value={currentFilters.sort || 'newest'}
            onChange={(e) => onFilterChange({ sort: e.target.value, page: 1 })}
            aria-label="Urutkan produk"
            className="flex-1 px-3 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs font-medium focus:outline-none"
          >
            <option value="newest">Urutkan: Terbaru</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="name-asc">Nama A–Z</option>
            <option value="name-desc">Nama Z–A</option>
          </select>

          {/* Open Filter Drawer */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-soft-beige border border-light-beige text-charcoal text-xs font-semibold hover:bg-light-beige transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-deep-olive text-white text-[10px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal / Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/50 backdrop-blur-xs lg:hidden">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-light-beige shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-light-beige bg-soft-beige/40">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-deep-olive" />
                <h3 className="font-serif text-lg font-normal text-charcoal">
                  Filter Produk
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-warm-gray hover:text-charcoal"
                aria-label="Tutup filter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Body */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Category */}
              {!hideCategoryFilter && (
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal mb-2">
                    Kategori
                  </label>
                  <select
                    value={currentFilters.category || ''}
                    onChange={(e) => onFilterChange({ category: e.target.value || undefined, page: 1 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Rentang Harga
                </label>
                <div className="grid grid-cols-1 gap-1.5">
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
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left font-medium transition-colors ${
                          isSelected
                            ? 'border-deep-olive bg-deep-olive/10 text-deep-olive font-semibold'
                            : 'border-light-beige bg-white text-warm-gray'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-deep-olive" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Ketersediaan Stok
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '', label: 'Semua Stok' },
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
                        className={`p-2.5 rounded-xl border text-center font-medium transition-colors ${
                          isSelected
                            ? 'border-deep-olive bg-deep-olive/10 text-deep-olive font-semibold'
                            : 'border-light-beige bg-white text-warm-gray'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer / Apply */}
            <div className="p-4 border-t border-light-beige bg-soft-beige/20 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3 rounded-btn bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold shadow-xs"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
