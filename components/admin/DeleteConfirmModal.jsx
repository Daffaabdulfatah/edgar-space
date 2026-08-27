'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ 
  isOpen, 
  title = 'Konfirmasi Hapus', 
  message = 'Apakah Anda yakin ingin menghapus data ini?', 
  itemName,
  loading, 
  onClose, 
  onConfirm 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
      <div className="bg-surface-white rounded-card border border-light-taupe shadow-hover w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-normal text-charcoal">
                {title}
              </h3>
              <p className="text-sm text-warm-gray mt-1.5 leading-relaxed">
                {message}
              </p>
              {itemName && (
                <p className="mt-2 text-xs font-semibold text-charcoal bg-soft-beige/60 px-3 py-1.5 rounded-md border border-light-taupe">
                  {itemName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-light-taupe">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-btn text-xs font-semibold text-warm-gray hover:text-charcoal transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-btn text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
