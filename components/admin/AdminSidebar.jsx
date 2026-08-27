'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Boxes, 
  Settings,
  LogOut, 
  X,
  User,
  AlertTriangle
} from 'lucide-react';
import { fetchApi } from '@/libs/api';

export default function AdminSidebar({ isOpen, onClose, admin }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetchApi('/admin/logout', { method: 'POST' }).catch(() => {
        return fetchApi('/auth/logout', { method: 'POST' });
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
      router.push('/admin/login');
      router.refresh();
    }
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Produk',
      href: '/admin/produk',
      icon: Package,
      exact: false
    },
    {
      name: 'Kategori',
      href: '/admin/kategori',
      icon: FolderTree,
      exact: false
    },
    {
      name: 'Stok',
      href: '/admin/stok',
      icon: Boxes,
      exact: false
    },
    {
      name: 'Pengaturan',
      href: '/admin/pengaturan',
      icon: Settings,
      exact: false
    }
  ];

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href) || (item.href === '/admin/produk' && pathname.startsWith('/admin/products')) || (item.href === '/admin/kategori' && pathname.startsWith('/admin/categories')) || (item.href === '/admin/stok' && pathname.startsWith('/admin/stock'));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1E251E] text-[#EDE9E1] border-r border-[#2D382D] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#2D382D] bg-[#171D17]">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-terracotta flex items-center justify-center font-serif text-white font-bold text-base shadow-xs">
              E
            </span>
            <div>
              <span className="font-serif tracking-wider text-base font-semibold block text-[#F7F5F0]">
                EDGAR SPACE
              </span>
              <span className="text-[10px] text-[#A8A49C] tracking-widest uppercase block -mt-0.5">
                Panel Admin
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A8A49C] hover:text-white lg:hidden hover:bg-[#2B352B]"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-terracotta text-white shadow-sm font-semibold'
                    : 'text-[#C5C1B8] hover:bg-[#2B352B] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#A8A49C]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / User & Logout */}
        <div className="p-4 border-t border-[#2D382D] bg-[#171D17]/50 space-y-3">
          <div className="flex items-center space-x-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#2B352B] flex items-center justify-center text-[#C5C1B8] border border-[#3A473A]">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {admin?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-[#A8A49C] truncate">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E07A5F] hover:bg-red-500/10 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-light-beige space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="p-2 bg-amber-50 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-normal text-charcoal">
                Konfirmasi Keluar
              </h3>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed font-sans">
              Apakah Anda yakin ingin keluar dari Panel Admin Edgar Space?
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-charcoal bg-warm-beige/50 hover:bg-warm-beige rounded-xl transition-colors"
                disabled={loggingOut}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-hover rounded-xl transition-colors shadow-xs disabled:opacity-50"
                disabled={loggingOut}
              >
                {loggingOut ? 'Memproses...' : 'Ya, Keluar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
