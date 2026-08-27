'use client';

import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { fetchApi } from '@/libs/api';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Edgar Space');
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890');
  const [email, setEmail] = useState('hello@edgarspace.com');
  const [address, setAddress] = useState('Bandung, Jawa Barat, Indonesia');
  const [description, setDescription] = useState('Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetchApi('/settings');
        if (res.success && res.data) {
          const s = res.data;
          setStoreName(s.storeName || 'Edgar Space');
          setWhatsappNumber(s.whatsappNumber || '6281234567890');
          setEmail(s.email || 'hello@edgarspace.com');
          setAddress(s.address || 'Bandung, Jawa Barat, Indonesia');
          setDescription(s.description || 'Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.');
        }
      } catch (err) {
        setErrorMsg('Gagal memuat pengaturan toko.');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!storeName.trim()) {
      setErrorMsg('Nama toko tidak boleh kosong.');
      return;
    }
    if (!whatsappNumber.trim()) {
      setErrorMsg('Nomor WhatsApp wajib diisi.');
      return;
    }

    try {
      setSaving(true);
      const res = await fetchApi('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          storeName: storeName.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: email.trim(),
          address: address.trim(),
          description: description.trim()
        })
      });

      if (res.success) {
        setSuccessMsg('Pengaturan toko berhasil diperbarui!');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan perubahan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
        <p className="text-xs text-warm-gray">Memuat pengaturan toko...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
          Pengaturan
        </h1>
        <p className="text-xs sm:text-sm text-warm-gray mt-1 font-light">
          Kelola informasi toko dan konfigurasi checkout WhatsApp Edgar Space.
        </p>
      </div>

      {/* Main Settings Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-light-beige shadow-xs space-y-6">
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-xs text-red-700 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="border-b border-light-beige pb-3">
          <h2 className="font-serif text-lg text-charcoal font-normal flex items-center space-x-2">
            <Store className="w-5 h-5 text-deep-olive" />
            <span>Informasi Toko</span>
          </h2>
          <p className="text-xs text-warm-gray mt-0.5">
            Informasi umum yang dapat digunakan pada publik website.
          </p>
        </div>

        {/* Nama Toko & Nomor WA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Store className="w-3.5 h-3.5 text-warm-gray" />
              <span>Nama Toko <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Edgar Space"
              required
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-warm-gray" />
              <span>Nomor WhatsApp Toko <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="6281234567890"
              required
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
            <p className="text-[11px] text-warm-gray mt-1">
              Gunakan kode negara tanpa tanda &rsquo;+&rsquo; (contoh: <strong>6281234567890</strong>). Nomor ini langsung digunakan oleh fitur Checkout WhatsApp di public website.
            </p>
          </div>
        </div>

        {/* Email & Alamat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-warm-gray" />
              <span>Email Resmi</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@edgarspace.com"
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-warm-gray" />
              <span>Alamat Toko / Showroom</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Bandung, Jawa Barat, Indonesia"
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>
        </div>

        {/* Deskripsi Toko */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-warm-gray" />
            <span>Deskripsi Toko</span>
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern."
            className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-light-beige flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold transition-colors shadow-xs flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
