'use client';

import React, { useState, useEffect } from 'react';
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

export default function AdminNewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState('0');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetchApi('/admin/categories');
        if (res.success) {
          setCategories(res.data || []);
          if (res.data && res.data.length > 0) {
            setCategoryId(res.data[0].id.toString());
          }
        }
      } catch (err) {
        setError('Gagal memuat daftar kategori.');
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5 MB.');
      return;
    }

    // Validate type
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
      setError('Nama produk wajib diisi.');
      return;
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Harga produk tidak valid.');
      return;
    }

    if (!categoryId) {
      setError('Kategori wajib dipilih.');
      return;
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setError('Stok awal tidak boleh kurang dari 0.');
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('price', priceNum.toString());
      formData.append('categoryId', categoryId.toString());
      formData.append('stock', stockNum.toString());
      formData.append('isFeatured', isFeatured ? 'true' : 'false');

      if (imageFile) {
        formData.append('thumbnail', imageFile);
      }

      await fetchApi('/admin/products', {
        method: 'POST',
        body: formData
      });

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan produk.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button & Title */}
      <div className="flex items-center space-x-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg bg-surface-white border border-light-taupe text-charcoal hover:bg-soft-beige transition-colors"
          title="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-charcoal font-normal">
            Tambah Produk Baru
          </h1>
          <p className="text-xs text-warm-gray mt-0.5">
            Slug produk akan dibuat secara otomatis oleh sistem.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Produk */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Cermin LED Touchscreen"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            {loadingCategories ? (
              <div className="flex items-center space-x-2 text-xs text-warm-gray py-2">
                <Loader2 className="w-4 h-4 animate-spin text-deep-olive" />
                <span>Memuat kategori...</span>
              </div>
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
              >
                <option value="" disabled>Pilih Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Harga */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 450000"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Stok Awal */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Stok Awal <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Contoh: 10"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
            <p className="text-[11px] text-warm-gray mt-1">
              Mutasi stok awal akan otomatis dicatat dalam riwayat stok.
            </p>
          </div>

          {/* Status Produk Pilihan */}
          <div className="flex items-center mt-6">
            <label className="relative flex items-center cursor-pointer space-x-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-deep-olive border-light-taupe rounded focus:ring-deep-olive"
              />
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider select-none">
                Jadikan Produk Pilihan (Featured)
              </span>
            </label>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Deskripsi Produk
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesifikasi, material, dan fungsi produk..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Upload Gambar Produk */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Gambar Produk
            </label>
            
            {imagePreview ? (
              <div className="relative inline-block border border-light-taupe rounded-img overflow-hidden bg-soft-beige">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover"
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
              <label className="border-2 border-dashed border-light-taupe hover:border-deep-olive rounded-card p-8 flex flex-col items-center justify-center cursor-pointer bg-warm-ivory/40 transition-colors">
                <Upload className="w-8 h-8 text-warm-gray mb-2" />
                <span className="text-xs font-semibold text-charcoal">
                  Klik untuk mengunggah gambar produk
                </span>
                <span className="text-[11px] text-warm-gray mt-1">
                  Mendukung JPG, PNG, atau WEBP (Maks. 5 MB)
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
            href="/admin/products"
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
                <span>Simpan Produk</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
