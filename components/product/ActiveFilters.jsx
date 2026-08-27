'use client';

import React from 'react';
import { X, RotateCcw } from 'lucide-react';

/**
 * Active Filter Chips Component
 * @param {{
 *   filters: {
 *     q?: string,
 *     category?: string,
 *     categoryName?: string,
 *     minPrice?: string,
 *     maxPrice?: string,
 *     stockStatus?: string,
 *     sort?: string
 *   },
 *   categories?: Array<{ slug: string, name: string }>,
 *   onRemoveFilter: (key: string) => void,
 *   onResetAll: () => void
 * }} props 
 */
export default function ActiveFilters({
  filters,
  categories = [],
  onRemoveFilter,
  onResetAll
}) {
  const chips = [];

  // Search Chip
  if (filters.q) {
    chips.push({
      key: 'q',
      label: `Pencarian: "${filters.q}"`
    });
  }

  // Category Chip
  if (filters.category) {
    const matchedCategory = categories.find((c) => c.slug === filters.category);
    chips.push({
      key: 'category',
      label: `Kategori: ${matchedCategory?.name || filters.categoryName || filters.category}`
    });
  }

  // Price Range Chip
  if (filters.minPrice || filters.maxPrice) {
    let priceLabel = 'Harga: ';
    const min = Number(filters.minPrice);
    const max = Number(filters.maxPrice);

    if (filters.minPrice && filters.maxPrice) {
      priceLabel += `Rp${min.toLocaleString('id-ID')} – Rp${max.toLocaleString('id-ID')}`;
    } else if (filters.maxPrice) {
      priceLabel += `< Rp${max.toLocaleString('id-ID')}`;
    } else if (filters.minPrice) {
      priceLabel += `> Rp${min.toLocaleString('id-ID')}`;
    }
    chips.push({
      key: 'price',
      label: priceLabel
    });
  }

  // Stock Status Chip
  if (filters.stockStatus) {
    const stockLabels = {
      'available': 'Ketersediaan: Tersedia',
      'limited': 'Ketersediaan: Stok Terbatas',
      'out-of-stock': 'Ketersediaan: Habis'
    };
    chips.push({
      key: 'stockStatus',
      label: stockLabels[filters.stockStatus] || `Ketersediaan: ${filters.stockStatus}`
    });
  }

  // Sort Chip (only if not default 'newest')
  if (filters.sort && filters.sort !== 'newest') {
    const sortLabels = {
      'price-asc': 'Urutkan: Harga Terendah',
      'price-desc': 'Urutkan: Harga Tertinggi',
      'name-asc': 'Urutkan: Nama A–Z',
      'name-desc': 'Urutkan: Nama Z–A'
    };
    chips.push({
      key: 'sort',
      label: sortLabels[filters.sort] || `Urutkan: ${filters.sort}`
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2 pt-2">
      <span className="text-xs text-warm-gray font-medium">Filter Aktif:</span>

      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemoveFilter(chip.key)}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-light-beige text-xs text-charcoal font-medium hover:border-warm-gray transition-colors group cursor-pointer shadow-xs"
        >
          <span>{chip.label}</span>
          <X className="w-3 h-3 text-warm-gray group-hover:text-charcoal" />
        </button>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center space-x-1 text-xs text-deep-olive hover:underline font-semibold ml-1 py-1 cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Hapus Semua</span>
      </button>
    </div>
  );
}
