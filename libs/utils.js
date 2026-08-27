import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers as Indonesian Rupiah (Rp) deterministically without server-client hydration mismatch
 * @param {number|string} amount 
 * @returns {string}
 */
export function formatRupiah(amount) {
  const num = Number(amount);
  if (isNaN(num)) return 'Rp0';
  const formatted = Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp${formatted}`;
}

/**
 * Get Indonesian stock status label and style class
 * @param {number} stock 
 * @returns {{ label: string, variant: 'in-stock' | 'low-stock' | 'out-of-stock' }}
 */
export function getStockStatus(stock) {
  if (stock <= 0) {
    return {
      label: 'Habis',
      variant: 'out-of-stock'
    };
  }
  if (stock <= 5) {
    return {
      label: 'Stok Terbatas',
      variant: 'low-stock'
    };
  }
  return {
    label: 'Tersedia',
    variant: 'in-stock'
  };
}
