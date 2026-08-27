'use client';

import React, { useState } from 'react';
import ProductQuantity from './ProductQuantity';
import { formatRupiah } from '@/libs/utils';
import { fetchApi } from '@/libs/api';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function WhatsAppOrderButton({ product }) {
  const { addToCart, openCart } = useCart();
  const initialStock = product?.stock ?? 0;
  const [currentStock, setCurrentStock] = useState(initialStock);
  const [quantity, setQuantity] = useState(1);
  const [validating, setValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isOutOfStock = currentStock <= 0;
  const priceNum = Number(product?.price) || 0;
  const subtotal = priceNum * quantity;

  // Handle Add to Cart
  const handleAddToCart = async () => {
    setErrorMessage('');
    setAddedSuccess(false);

    if (isOutOfStock) {
      setErrorMessage('Produk sedang habis.');
      return;
    }

    try {
      setValidating(true);
      if (product?.slug) {
        const res = await fetchApi(`/products/${product.slug}`).catch(() => null);
        if (res?.success && res?.data) {
          const latestStock = res.data.stock ?? 0;
          setCurrentStock(latestStock);

          if (latestStock <= 0) {
            setErrorMessage('Maaf, produk ini baru saja habis.');
            return;
          }

          if (quantity > latestStock) {
            setErrorMessage(`Stok produk tidak mencukupi. Stok tersedia saat ini: ${latestStock} produk.`);
            setQuantity(latestStock);
            return;
          }
        }
      }

      // Add to Cart Context and open Cart Drawer
      addToCart(product, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    } catch (err) {
      addToCart(product, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Error Notice */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700 font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Notification */}
      {addedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-sans animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>{quantity}x {product.name}</strong> telah ditambahkan ke keranjang!</span>
          </div>
          <button
            onClick={openCart}
            className="font-bold underline text-emerald-900 hover:text-emerald-950 text-xs shrink-0 cursor-pointer"
          >
            Lihat Keranjang
          </button>
        </div>
      )}

      {/* Quantity Selector */}
      <ProductQuantity
        quantity={quantity}
        maxStock={currentStock}
        onChange={(qty) => {
          setQuantity(qty);
          setErrorMessage('');
        }}
        disabled={isOutOfStock || validating}
      />

      {/* Subtotal Preview */}
      {!isOutOfStock && quantity > 1 && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-soft-beige/60 border border-light-beige text-xs">
          <span className="text-warm-gray font-medium">Estimasi Subtotal ({quantity} unit):</span>
          <span className="font-sans font-bold text-charcoal text-sm">
            {formatRupiah(subtotal)}
          </span>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || validating}
          className="w-full inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-btn bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {validating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : isOutOfStock ? (
            <span>Produk Sedang Habis</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 fill-white/20" />
              <span>+ Tambah ke Keranjang</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={openCart}
          className="w-full inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-btn border border-light-beige hover:border-deep-olive/40 bg-white hover:bg-warm-ivory/50 text-charcoal text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Lihat Keranjang &amp; Checkout</span>
          <ArrowRight className="w-3.5 h-3.5 text-warm-gray" />
        </button>

        <p className="text-[11px] text-warm-gray font-sans font-light leading-relaxed">
          Produk akan dimasukkan ke keranjang terlebih dahulu. Anda dapat meninjau seluruh pesanan sebelum melakukan checkout.
        </p>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-light-beige p-4 lg:hidden shadow-lg flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[11px] text-warm-gray block uppercase tracking-wider">
            Subtotal ({quantity} unit)
          </span>
          <span className="font-sans font-bold text-base text-charcoal truncate block">
            {formatRupiah(subtotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || validating}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-btn bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-xs disabled:opacity-50 shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? 'Stok Habis' : '+ Ke Keranjang'}</span>
        </button>
      </div>
    </div>
  );
}
