'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { fetchApi } from '@/libs/api';

export default function StockModal({ isOpen, product, onClose, onSuccess }) {
  const [type, setType] = useState('RESTOCK');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setType('RESTOCK');
      setQuantity('');
      setNote('');
      setError('');
      setLoading(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const currentStock = product.stock || 0;
  const qtyNumber = parseInt(quantity, 10) || 0;

  let calculatedStock = currentStock;
  if (type === 'RESTOCK') {
    calculatedStock = currentStock + qtyNumber;
  } else if (type === 'REDUCTION') {
    calculatedStock = Math.max(0, currentStock - qtyNumber);
  } else if (type === 'ADJUSTMENT') {
    calculatedStock = qtyNumber >= 0 ? qtyNumber : 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (qtyNumber <= 0) {
      setError('Jumlah stok harus lebih dari 0.');
      return;
    }

    if (type === 'REDUCTION' && qtyNumber > currentStock) {
      setError(`Stok tidak mencukupi. Stok saat ini hanya ${currentStock}.`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetchApi(`/admin/products/${product.id}/stock`, {
        method: 'POST',
        body: JSON.stringify({
          type,
          quantity: qtyNumber,
          note: note.trim()
        })
      });

      if (onSuccess) {
        onSuccess(res.data);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui stok.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
      <div className="bg-surface-white rounded-card border border-light-taupe shadow-hover w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-taupe bg-soft-beige/30">
          <div>
            <h3 className="font-serif text-xl font-normal text-charcoal">
              Kelola Stok Produk
            </h3>
            <p className="text-xs text-warm-gray mt-0.5">
              {product.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-warm-gray hover:text-charcoal hover:bg-soft-beige transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Current Stock vs New Stock Preview */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-soft-beige/50 border border-light-taupe">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-warm-gray block">
                Stok Saat Ini
              </span>
              <span className="text-2xl font-serif font-bold text-charcoal">
                {currentStock}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-warm-gray block">
                Estimasi Stok Baru
              </span>
              <span className={`text-2xl font-serif font-bold ${
                calculatedStock < currentStock ? 'text-muted-terracotta' : calculatedStock > currentStock ? 'text-deep-olive' : 'text-charcoal'
              }`}>
                {calculatedStock}
              </span>
            </div>
          </div>

          {/* Action Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Jenis Perubahan
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('RESTOCK')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-colors ${
                  type === 'RESTOCK'
                    ? 'border-deep-olive bg-deep-olive/10 text-deep-olive font-semibold'
                    : 'border-light-taupe bg-surface-white text-warm-gray hover:border-warm-gray'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 mb-1 text-deep-olive" />
                <span>Tambah Stok</span>
              </button>

              <button
                type="button"
                onClick={() => setType('REDUCTION')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-colors ${
                  type === 'REDUCTION'
                    ? 'border-muted-terracotta bg-muted-terracotta/10 text-muted-terracotta font-semibold'
                    : 'border-light-taupe bg-surface-white text-warm-gray hover:border-warm-gray'
                }`}
              >
                <ArrowDownRight className="w-4 h-4 mb-1 text-muted-terracotta" />
                <span>Kurangi Stok</span>
              </button>

              <button
                type="button"
                onClick={() => setType('ADJUSTMENT')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-colors ${
                  type === 'ADJUSTMENT'
                    ? 'border-charcoal bg-charcoal/10 text-charcoal font-semibold'
                    : 'border-light-taupe bg-surface-white text-warm-gray hover:border-warm-gray'
                }`}
              >
                <RefreshCw className="w-4 h-4 mb-1 text-charcoal" />
                <span>Penyesuaian</span>
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              {type === 'ADJUSTMENT' ? 'Jumlah Stok Akhir' : 'Jumlah Perubahan'}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Contoh: 10"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Catatan (Opsional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Restock gudang, barang rusak, penyesuaian opname"
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-light-taupe">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-btn text-xs font-semibold text-warm-gray hover:text-charcoal transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-btn text-xs font-semibold bg-deep-olive hover:bg-deep-olive-hover text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
