"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { navigationLinks } from '@/data/navigation';
import { SITE_NAME } from '@/libs/constants';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-warm-ivory p-6 shadow-2xl flex flex-col justify-between border-l border-light-beige animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-light-beige">
            <span className="font-serif text-xl tracking-wider text-charcoal font-normal">
              {SITE_NAME}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-warm-gray hover:text-charcoal transition-colors rounded-full hover:bg-soft-beige"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-4">
            {navigationLinks.map((link) => {
              const isKoleksi = link.name === 'Koleksi' || link.href === '/produk' || link.href === '/koleksi';
              const isKoleksiActive = isKoleksi && (pathname.startsWith('/produk') || pathname.startsWith('/koleksi'));
              const isHomeActive = link.href === '/' && (pathname === '/' || pathname === '');
              const isOtherActive = link.href !== '/' && !isKoleksi && pathname.startsWith(link.href);
              const isActive = isHomeActive || isKoleksiActive || isOtherActive;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`font-sans text-base transition-colors py-2 border-b border-light-beige/40 flex items-center justify-between ${
                    isActive
                      ? 'font-bold text-terracotta border-l-4 border-l-amber-500 pl-2'
                      : 'font-medium text-charcoal hover:text-deep-olive'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-light-beige space-y-2 text-xs text-warm-gray font-light">
          <p className="font-serif text-sm text-charcoal font-normal">
            Edgar Space
          </p>
          <p>
            Solusi modern untuk melengkapi rumah dan menciptakan ruang yang lebih nyaman.
          </p>
        </div>
      </div>
    </div>
  );
}
