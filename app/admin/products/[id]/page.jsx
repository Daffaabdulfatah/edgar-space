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
  Boxes
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';
import StockModal from '@/components/admin/StockModal';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Stock modal
  const [isStockOpen, setIsStockOpen] = useState(false);

  const loadProductData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [prodRes, catRes] = await Promise.all([
        fetchApi(`/admin/products/${productId}`),
        fetchApi('/admin/categories')
      ]);

      if (prodRes.success && prodRes.data) {
        const p = prodRes.data;
        setProduct(p);
        setName(p.name || '');
        setDescription(p.description || '');
        setPrice(p.price?.toString() || '');
        setCategoryId(p.categoryId?.toString() || '');
        setIsFeatured(Boolean(p.isFeatured));
        setCurrentThumbnail(p.thumbnail || null);
      }

      if (catRes.success) {
        setCategories(catRes.data || []);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat detail produk.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId, loadProductData]);

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

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('price', priceNum.toString());
      formData.append('categoryId', categoryId.toString());
      formData.append('isFeatured', isFeatured ? 'true' : 'false');

      if (imageFile) {
        formData.append('thumbnail', imageFile);
      }

      await fetchApi(`/admin/products/${productId}`, {
        method: 'PUT',
        body: formData
      });

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memperbarui produk.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
        <p className="text-sm text-warm-gray">Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
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
              Edit Produk
            </h1>
            <p className="text-xs text-warm-gray mt-0.5">
              Perbarui informasi katalog produk.
            </p>
          </div>
        </div>

        {/* Separate stock management action */}
        {product && (
          <button
            type="button"
            onClick={() => setIsStockOpen(true)}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-btn bg-soft-beige border border-light-taupe text-charcoal text-xs font-semibold hover:bg-light-taupe/60 transition-colors"
          >
            <Boxes className="w-4 h-4 text-deep-olive" />
            <span>Stok Saat Ini: <strong>{product.stock}</strong></span>
          </button>
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
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Status Produk Pilihan */}
          <div className="md:col-span-2 flex items-center">
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-taupe bg-surface-white text-charcoal text-sm focus:outline-none focus:border-deep-olive"
            />
          </div>

          {/* Upload Gambar Produk */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Gambar Produk
            </label>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Current or New Preview */}
              {(imagePreview || currentThumbnail) && (
                <div className="relative border border-light-taupe rounded-img overflow-hidden bg-soft-beige shrink-0">
                  <img
                    src={imagePreview || getImageUrl(currentThumbnail)}
                    alt="Preview"
                    className="w-36 h-36 object-cover"
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

              {/* Upload Input */}
              <label className="flex-1 border-2 border-dashed border-light-taupe hover:border-deep-olive rounded-card p-6 flex flex-col items-center justify-center cursor-pointer bg-warm-ivory/40 transition-colors w-full">
                <Upload className="w-6 h-6 text-warm-gray mb-1.5" />
                <span className="text-xs font-semibold text-charcoal">
                  Pilih file gambar baru
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
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Stock Modal */}
      <StockModal
        isOpen={isStockOpen}
        product={product}
        onClose={() => setIsStockOpen(false)}
        onSuccess={loadProductData}
      />
    </div>
  );
}
