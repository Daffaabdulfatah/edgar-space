'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'edgar_space_cart';

const defaultCartContext = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  showToast: () => {},
  totalCount: 0,
  totalPrice: 0,
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Gagal membaca cart dari localStorage:', e);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (e) {
        console.error('Gagal menyimpan cart ke localStorage:', e);
      }
    }
  }, [cartItems, isMounted]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const availableStock = product.stock !== undefined ? product.stock : 999;

    if (availableStock <= 0) {
      showToast('Produk sedang habis.', 'error');
      return;
    }

    let addedSuccessfully = true;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prevItems[existingIndex].quantity;
        const newQty = currentQty + quantity;
        
        if (newQty > availableStock) {
          showToast(`Jumlah melebihi stok yang tersedia (${availableStock}).`, 'error');
          addedSuccessfully = false;
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          stock: availableStock,
          price: Number(product.price) || updated[existingIndex].price
        };
        return updated;
      }

      if (quantity > availableStock) {
        showToast(`Jumlah melebihi stok yang tersedia (${availableStock}).`, 'error');
        addedSuccessfully = false;
        return prevItems;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: Number(product.price) || 0,
          thumbnail: product.thumbnail || product.image || '',
          category: product.category || '',
          stock: availableStock,
          quantity: quantity,
        },
      ];
    });

    if (addedSuccessfully) {
      showToast('Produk berhasil ditambahkan ke keranjang.', 'success');
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    showToast('Produk dihapus dari keranjang.', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock !== undefined ? item.stock : 999;
          if (quantity > maxStock) {
            showToast(`Jumlah melebihi stok yang tersedia (${maxStock}).`, 'error');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        openCart,
        closeCart,
        showToast,
        totalCount,
        totalPrice,
      }}
    >
      {children}

      {/* Lightweight Toast Feedback Popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-[#1E251E] text-white border-[#2D382D]'
              : toast.type === 'error'
              ? 'bg-red-900 text-white border-red-700'
              : 'bg-charcoal text-white border-warm-gray/30'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 p-0.5 text-warm-gray hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return defaultCartContext;
  }
  return context;
}
