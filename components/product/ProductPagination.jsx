'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Product Catalog Pagination Component
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   onPageChange: (page: number) => void
 * }} props 
 */
export default function ProductPagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate pagination items with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // Number of pages before and after current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < totalPages)
      ) {
        pages.push('...');
      }
    }

    // Deduplicate consecutive ellipses
    return pages.filter((item, index) => item !== '...' || pages[index - 1] !== '...');
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Navigasi Halaman Produk"
      className="flex items-center justify-center space-x-1.5 sm:space-x-2 pt-10 pb-4"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center space-x-1 px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-xs font-semibold text-charcoal hover:bg-soft-beige transition-colors disabled:opacity-40 disabled:pointer-events-none shadow-xs cursor-pointer"
        aria-label="Halaman Sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Sebelumnya</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-xs text-warm-gray select-none"
              >
                &hellip;
              </span>
            );
          }

          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                isCurrent
                  ? 'bg-deep-olive text-white shadow-sm'
                  : 'bg-white border border-light-beige text-charcoal hover:bg-soft-beige'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center space-x-1 px-3.5 py-2.5 rounded-xl border border-light-beige bg-white text-xs font-semibold text-charcoal hover:bg-soft-beige transition-colors disabled:opacity-40 disabled:pointer-events-none shadow-xs cursor-pointer"
        aria-label="Halaman Berikutnya"
      >
        <span className="hidden sm:inline">Berikutnya</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
