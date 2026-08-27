'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Accessible Product Quantity Selector Component
 * @param {{
 *   quantity: number,
 *   maxStock: number,
 *   onChange: (qty: number) => void,
 *   disabled?: boolean
 * }} props 
 */
export default function ProductQuantity({
  quantity = 1,
  maxStock = 0,
  onChange,
  disabled = false
}) {
  const isOutOfStock = maxStock <= 0 || disabled;

  const handleDecrease = () => {
    if (quantity > 1 && !isOutOfStock) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxStock && !isOutOfStock) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    if (isOutOfStock) return;
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      onChange(1);
    } else if (val > maxStock) {
      onChange(maxStock);
    } else {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="product-quantity-input" className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
        Jumlah Pesanan
      </label>

      <div className="flex items-center space-x-3">
        <div className={`inline-flex items-center rounded-xl border border-light-beige bg-white overflow-hidden shadow-xs ${
          isOutOfStock ? 'opacity-50 pointer-events-none' : ''
        }`}>
          {/* Decrease Button */}
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-soft-beige transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Kurangi jumlah"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Quantity Input */}
          <input
            id="product-quantity-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={isOutOfStock ? 0 : quantity}
            onChange={handleInputChange}
            disabled={isOutOfStock}
            aria-label="Jumlah produk"
            className="w-12 h-10 text-center font-mono font-semibold text-sm text-charcoal bg-transparent focus:outline-none border-x border-light-beige"
          />

          {/* Increase Button */}
          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= maxStock || isOutOfStock}
            className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-soft-beige transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Tambah jumlah"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stock note indicator */}
        {!isOutOfStock && maxStock <= 5 && (
          <span className="text-xs text-terracotta font-medium">
            (Sisa {maxStock} unit)
          </span>
        )}
      </div>
    </div>
  );
}
