'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';

export default function AddProductPage() {
  const router = useRouter();
  
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  // Automatic Slug generation from Name
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(generatedSlug);
  }, [name]);

  // Load categories
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

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB.');
      return;
    }

    setImageFile(file);
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    // Upload immediately via Express REST API
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetchApi('/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (res.success && res.data?.url) {
        setThumbnailUrl(res.data.url);
      }
    } catch (err) {
      console.error('Failed uploading image:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setThumbnailUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama produk wajib diisi.');
      return;
    }
    if (!categoryId) {
      setError('Kategori wajib dipilih.');
      return;
    }
    if (!price || Number(price) < 0) {
      setError('Harga produk tidak boleh kosong atau negatif.');
      return;
    }
    if (stock === '' || Number(stock) < 0) {
      setError('Stok awal tidak boleh negatif.');
      return;
    }

    try {
      setSubmitting(true);

      let res;
      if (imageFile) {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description.trim());
        formData.append('thumbnail', imageFile);

        res = await fetchApi('/admin/products', {
          method: 'POST',
          body: formData
        });
      } else {
        res = await fetchApi('/admin/products', {
          method: 'POST',
          body: JSON.stringify({
            name: name.trim(),
            categoryId: Number(categoryId),
            price: Number(price),
            stock: Number(stock),
            description: description.trim(),
            thumbnail: thumbnailUrl || null
          })
        });
      }

      if (res.success) {
        router.push('/admin/produk');
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'Gagal menyimpan produk.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Link
          href="/admin/produk"
          className="p-2 rounded-xl border border-light-beige bg-white text-charcoal hover:bg-warm-ivory transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Tambah Produk
          </h1>
          <p className="text-xs text-warm-gray font-light">
            Isi formulir untuk menambakan produk baru ke katalog Edgar Space.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-light-beige shadow-xs space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Nama Produk & Slug */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Cermin LED Touchscreen"
              required
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
              Slug Otomatis
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/50 text-warm-gray text-xs font-mono cursor-not-allowed"
            />
            <p className="text-[11px] text-warm-gray mt-1">
              Generated automatically for URL slug: /produk/{slug || 'nama-produk'}
            </p>
          </div>
        </div>

        {/* Kategori, Harga & Stok */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            {loadingCategories ? (
              <div className="py-2.5 px-3 border border-light-beige rounded-xl text-xs text-warm-gray flex items-center space-x-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Memuat kategori...</span>
              </div>
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full px-3 py-3 rounded-xl border border-light-beige bg-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="450000"
              required
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Stok Awal <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="10"
              required
              className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
            Deskripsi Produk
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan spesifikasi, bahan, ukuran, dan keunggulan produk..."
            className="w-full px-4 py-3 rounded-xl border border-light-beige text-charcoal text-sm focus:outline-none focus:border-deep-olive"
          />
        </div>

        {/* Gambar Produk */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
            Gambar Produk
          </label>

          {imagePreview || thumbnailUrl ? (
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-light-beige bg-soft-beige group">
              <Image
                src={imagePreview || getImageUrl(thumbnailUrl)}
                alt="Preview Produk"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors"
                title="Hapus Gambar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-light-beige hover:border-deep-olive rounded-2xl p-6 cursor-pointer bg-warm-ivory/20 hover:bg-warm-ivory/40 transition-colors">
                <Upload className="w-8 h-8 text-warm-gray mb-2" />
                <span className="text-xs font-semibold text-charcoal">
                  Klik untuk Unggah Gambar Produk
                </span>
                <span className="text-[11px] text-warm-gray mt-1">
                  Format JPG, PNG, WEBP (Maksimal 5 MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

              <div className="flex items-center space-x-2 text-xs text-warm-gray">
                <span>Atau masukkan URL Gambar:</span>
              </div>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-light-beige text-charcoal text-xs focus:outline-none focus:border-deep-olive"
              />
            </div>
          )}
        </div>

        {/* Form Action Buttons */}
        <div className="pt-4 border-t border-light-beige flex items-center justify-end space-x-3">
          <Link
            href="/admin/produk"
            className="px-5 py-3 rounded-xl border border-light-beige text-charcoal text-xs font-semibold hover:bg-warm-ivory transition-colors"
          >
            Batalkan
          </Link>
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="px-6 py-3 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold transition-colors shadow-xs flex items-center space-x-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Produk...</span>
              </>
            ) : (
              <span>Simpan Produk</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
