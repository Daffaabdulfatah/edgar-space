'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  AlertCircle, 
  Loader2, 
  Check, 
  X 
} from 'lucide-react';
import { fetchApi } from '@/libs/api';

export default function AdminNewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5 MB.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, atau WEBP.');
      return;
    }

    setError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama kategori wajib diisi.');
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('name', name.trim());
      if (description.trim()) {
        formData.append('description', description.trim());
      }
      if (imageFile) {
        formData.append('thumbnail', imageFile);
      }

      await fetchApi('/admin/categories', {
        method: 'POST',
        body: formData
      });

      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan kategori.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back button & Title */}
      <div className="flex items-center space-x-3">
        <Link
          href="/admin/categories"
          className="p-2 rounded-lg bg-surface-white border border-light-taupe text-charcoal hover:bg-soft-beige transition-colors"
          title="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-charcoal font-normal">
            Tambah Kategori Baru
          </h1>
          <p className="text-xs text-warm-gray mt-0.5">
            Slug kategori akan digenerate otomatis oleh sistem.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-surface-white rounded-card border border-light-taupe p-6 sm:p-8 shadow-xs space-y-6">
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Nama Kategori */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Nama Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kebutuhan Kamar Mandi"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Deskripsi Kategori (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Perlengkapan sederhana untuk melengkapi ruangan..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Upload Thumbnail Kategori */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Thumbnail Kategori (Opsional)
            </label>
            
            {imagePreview ? (
              <div className="relative inline-block border border-light-taupe rounded-img overflow-hidden bg-soft-beige">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-36 h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 rounded-full bg-charcoal/70 text-white hover:bg-red-600 transition-colors"
                  title="Hapus Gambar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-light-taupe hover:border-deep-olive rounded-card p-6 flex flex-col items-center justify-center cursor-pointer bg-warm-ivory/40 transition-colors">
                <Upload className="w-6 h-6 text-warm-gray mb-1.5" />
                <span className="text-xs font-semibold text-charcoal">
                  Pilih file thumbnail kategori
                </span>
                <span className="text-[11px] text-warm-gray mt-0.5">
                  Mendukung JPG, PNG, WEBP (Maks. 5 MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-light-taupe">
          <Link
            href="/admin/categories"
            className="px-5 py-2.5 rounded-btn text-xs font-semibold text-warm-gray hover:text-charcoal transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-btn text-xs font-semibold bg-deep-olive hover:bg-deep-olive-hover text-white transition-colors shadow-xs flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Simpan Kategori</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
