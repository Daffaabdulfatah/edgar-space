'use client';

import React from 'react';
import { Menu, User } from 'lucide-react';

export default function AdminHeader({ onOpenSidebar, admin }) {
  return (
    <header className="h-16 bg-surface-white border-b border-light-taupe px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-lg text-charcoal hover:bg-soft-beige lg:hidden"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold tracking-wider text-deep-olive uppercase hidden sm:inline-block">
          Sistem Manajemen Toko
        </span>
      </div>

      {/* Admin Profile Details */}
      <div className="flex items-center space-x-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-charcoal leading-tight">
            {admin?.name || 'Administrator'}
          </p>
          <p className="text-xs text-warm-gray leading-tight">
            {admin?.email || 'admin@edgarspace.id'}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-soft-beige border border-light-taupe flex items-center justify-center text-deep-olive shadow-xs">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
