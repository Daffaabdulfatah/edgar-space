'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('0');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  // Load Categories & Existing Product Data
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingProduct(true);

        const [catRes, prodRes] = await Promise.all([
          fetchApi('/admin/categories'),
          fetchApi(`/admin/products/${productId}`)
        ]);

        if (catRes.success) {
          setCategories(catRes.data || []);
        }

        if (prodRes.success && prodRes.data) {
          const p = prodRes.data;
          setName(p.name || '');
          setSlug(p.slug || '');
          setCategoryId(p.categoryId ? p.categoryId.toString() : '');
          setPrice(p.price !== undefined ? p.price.toString() : '');
          setStock(p.stock !== undefined ? p.stock.toString() : '0');
          setDescription(p.description || '');
          setThumbnailUrl(p.thumbnail || '');
        }
      } catch (err) {
        setError(err.message || 'Gagal memuat data produk.');
      } finally {
        setLoadingProduct(false);
      }
    }

    if (productId) {
      loadData();
    }
  }, [productId]);

  // Update slug automatically when name changes
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    const newSlug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(newSlug);
  };

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
    if (price === '' || Number(price) < 0) {
      setError('Harga produk tidak boleh kosong atau negatif.');
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
        formData.append('description', description.trim());
        formData.append('thumbnail', imageFile);

        res = await fetchApi(`/admin/products/${productId}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        res = await fetchApi(`/admin/products/${productId}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: name.trim(),
            categoryId: Number(categoryId),
            price: Number(price),
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
      setError(err.message || 'Gagal memperbarui produk.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
        <p className="text-xs text-warm-gray">Memuat rincian produk...</p>
      </div>
    );
  }

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
            Edit Produk
          </h1>
          <p className="text-xs text-warm-gray font-light">
            Perbarui rincian informasi dan status produk.
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
              onChange={handleNameChange}
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
          </div>
        </div>

        {/* Kategori & Harga */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
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
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

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
                <span>Memproses...</span>
              </>
            ) : (
              <span>Simpan Perubahan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
