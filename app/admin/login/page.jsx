'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { fetchApi } from '@/libs/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    async function checkCurrentSession() {
      try {
        let res = await fetchApi('/admin/me').catch(() => null);
        if (!res || !res.success) {
          res = await fetchApi('/auth/me').catch(() => null);
        }
        if (res && res.success && res.data?.admin) {
          router.replace('/admin');
          return;
        }
      } catch (err) {
        // Not authenticated, stay on login
      } finally {
        setCheckingAuth(false);
      }
    }
    checkCurrentSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      let res;
      try {
        res = await fetchApi('/admin/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
      } catch (e1) {
        res = await fetchApi('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
      }

      if (res && res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res?.message || 'Email atau kata sandi salah. Silakan coba lagi.');
      }
    } catch (err) {
      setError(err.message || 'Email atau kata sandi salah. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-warm-ivory flex items-center justify-center">
        <div className="flex items-center space-x-2 text-warm-gray text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-deep-olive" />
          <span>Memeriksa sesi admin...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E251E] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-surface-white rounded-3xl border border-[#2D382D] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT: Brand / Visual Area */}
        <div className="lg:col-span-5 bg-[#171D17] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Background image subtle overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Interior Edgar Space"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171D17] via-[#171D17]/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-3 mb-8">
              <span className="w-9 h-9 rounded-xl bg-terracotta flex items-center justify-center font-serif text-white font-bold text-lg shadow-sm">
                E
              </span>
              <span className="font-serif tracking-widest text-xl font-medium text-[#F7F5F0]">
                EDGAR SPACE
              </span>
            </div>
            <div className="inline-block px-3 py-1 bg-[#2B352B] rounded-full border border-[#3A473A] text-xs font-mono text-[#C5C1B8] mb-4">
              Admin Panel
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#FAF7F2] leading-tight">
              Sistem Manajemen Furnitur & Dekorasi Rumah
            </h2>
          </div>

          <div className="relative z-10 pt-12 border-t border-[#2D382D]">
            <p className="text-xs text-[#A8A49C] leading-relaxed">
              Area khusus pengelola toko untuk mengontrol katalog produk, kategori, dan stok secara real-time.
            </p>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-white flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Selamat Datang Kembali
              </h1>
              <p className="text-xs sm:text-sm text-warm-gray mt-2 font-sans font-light">
                Masuk ke panel admin untuk mengelola Edgar Space.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@edgarspace.id"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-beige bg-warm-ivory/40 text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive transition-colors"
                  />
                  <Mail className="w-4 h-4 text-warm-gray absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-beige bg-warm-ivory/40 text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive transition-colors"
                  />
                  <Lock className="w-4 h-4 text-warm-gray absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-sans text-sm font-semibold bg-deep-olive hover:bg-deep-olive-hover text-white transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-8 mt-8 border-t border-light-beige text-center sm:text-left">
            <p className="text-xs text-warm-gray font-sans">
              © 2026 Edgar Space
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
