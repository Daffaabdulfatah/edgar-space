'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
}

