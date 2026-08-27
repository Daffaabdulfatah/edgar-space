'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  AlertCircle, 
  Loader2, 
  Check, 
  X,
  Package
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';

export default function AdminEditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id;

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchApi(`/admin/categories/${categoryId}`);
      if (res.success && res.data) {
        const c = res.data;
        setCategory(c);
        setName(c.name || '');
        setDescription(c.description || '');
        setCurrentThumbnail(c.thumbnail || null);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data kategori.');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      loadCategory();
    }
  }, [categoryId, loadCategory]);

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

  const handleRemoveNewImage = () => {
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
      formData.append('description', description.trim());

      if (imageFile) {
        formData.append('thumbnail', imageFile);
      }

      await fetchApi(`/admin/categories/${categoryId}`, {
        method: 'PUT',
        body: formData
      });

      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memperbarui kategori.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
        <p className="text-sm text-warm-gray">Memuat data kategori...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
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
              Edit Kategori
            </h1>
            <p className="text-xs text-warm-gray mt-0.5">
              Perbarui nama atau thumbnail kategori.
            </p>
          </div>
        </div>

        {category && (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-soft-beige text-xs font-semibold text-charcoal border border-light-taupe">
            <Package className="w-3.5 h-3.5 text-deep-olive" />
            <span>{category.productCount ?? 0} Produk</span>
          </span>
        )}
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
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Deskripsi Kategori
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Upload Thumbnail Kategori */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Thumbnail Kategori
            </label>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {(imagePreview || currentThumbnail) && (
                <div className="relative border border-light-taupe rounded-img overflow-hidden bg-soft-beige shrink-0">
                  <img
                    src={imagePreview || getImageUrl(currentThumbnail)}
                    alt="Preview"
                    className="w-32 h-32 object-cover"
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveNewImage}
                      className="absolute top-2 right-2 p-1 rounded-full bg-charcoal/70 text-white hover:bg-red-600 transition-colors"
                      title="Batalkan gambar baru"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              <label className="flex-1 border-2 border-dashed border-light-taupe hover:border-deep-olive rounded-card p-6 flex flex-col items-center justify-center cursor-pointer bg-warm-ivory/40 transition-colors w-full">
                <Upload className="w-6 h-6 text-warm-gray mb-1.5" />
                <span className="text-xs font-semibold text-charcoal">
                  Pilih file thumbnail baru
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
            </div>
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
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
