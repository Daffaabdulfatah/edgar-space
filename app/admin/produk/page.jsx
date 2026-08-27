'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Loader2,
  Package,
  Eye
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';
import { formatRupiah } from '@/libs/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockStatus, setSelectedStockStatus] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Modal states for delete
  const [deleteProductCandidate, setDeleteProductCandidate] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      params.append('limit', '100');
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedStockStatus) params.append('stockStatus', selectedStockStatus);
      if (selectedSort) params.append('sort', selectedSort);

      const [prodRes, catRes] = await Promise.all([
        fetchApi(`/admin/products?${params.toString()}`),
        fetchApi('/admin/categories')
      ]);

      if (prodRes.success && prodRes.data?.products) {
        setProducts(prodRes.data.products);
      } else {
        setProducts([]);
      }

      if (catRes.success) {
        setCategories(catRes.data || []);
      }
    } catch (err) {
      setError(err.message || 'Gagal mengambil daftar produk.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadFilteredProducts() {
      try {
        setLoading(true);
        setError('');

        const params = new URLSearchParams();
        params.append('limit', '100');
        if (searchQuery.trim()) params.append('q', searchQuery.trim());
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedStockStatus) params.append('stockStatus', selectedStockStatus);
        if (selectedSort) params.append('sort', selectedSort);

        const [prodRes, catRes] = await Promise.all([
          fetchApi(`/admin/products?${params.toString()}`),
          fetchApi('/admin/categories')
        ]);

        if (prodRes.success && prodRes.data?.products) {
          setProducts(prodRes.data.products);
        } else {
          setProducts([]);
        }

        if (catRes.success) {
          setCategories(catRes.data || []);
        }
      } catch (err) {
        setError(err.message || 'Gagal mengambil daftar produk.');
      } finally {
        setLoading(false);
      }
    }
    loadFilteredProducts();
  }, [searchQuery, selectedCategory, selectedStockStatus, selectedSort]);


  const handleDeleteConfirm = async () => {
    if (!deleteProductCandidate) return;

    try {
      setDeleting(true);
      const res = await fetchApi(`/admin/products/${deleteProductCandidate.id}`, {
        method: 'DELETE'
      });

      if (res.success) {
        setDeleteProductCandidate(null);
        fetchProducts();
      }
    } catch (err) {
      alert(err.message || 'Gagal menghapus produk.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Produk
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray mt-1 font-light">
            Kelola seluruh produk Edgar Space.
          </p>
        </div>

        <Link
          href="/admin/produk/tambah"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Produk</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-light-beige shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/30 text-charcoal text-xs focus:outline-none focus:border-deep-olive focus:ring-1 focus:ring-deep-olive"
          />
          <Search className="w-4 h-4 text-warm-gray absolute left-3.5 top-3" />
        </div>

        {/* Filters & Sorting */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="">Semua Status Stok</option>
            <option value="available">Tersedia (&gt;5)</option>
            <option value="limited">Stok Menipis (1-5)</option>
            <option value="out-of-stock">Habis (0)</option>
          </select>

          {/* Sorting */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="col-span-2 sm:col-span-1 px-3 py-2.5 rounded-xl border border-light-beige bg-white text-charcoal text-xs focus:outline-none focus:border-deep-olive cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="name-asc">Nama A-Z</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="stock-asc">Stok Terendah</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="py-20 bg-white rounded-2xl border border-light-beige flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
          <p className="text-xs text-warm-gray">Memuat daftar produk...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-xs text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl"
          >
            Coba Lagi
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-light-beige text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-soft-beige flex items-center justify-center text-warm-gray mx-auto">
            <Package className="w-8 h-8 opacity-60" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-charcoal font-normal">
              Belum ada produk.
            </h3>
            <p className="text-xs text-warm-gray mt-1">
              Tambahkan produk baru untuk mulai menampilkan katalog di toko.
            </p>
          </div>
          <Link
            href="/admin/produk/tambah"
            className="inline-block px-5 py-2.5 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold transition-colors"
          >
            + Tambah Produk
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl border border-light-beige shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-soft-beige/50 text-warm-gray uppercase text-[10px] tracking-wider border-b border-light-beige">
                <tr>
                  <th className="py-3.5 px-4">Gambar</th>
                  <th className="py-3.5 px-4">Nama Produk</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Harga</th>
                  <th className="py-3.5 px-4">Stok</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Updated</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-beige">
                {products.map((product) => {
                  const imageSrc = getImageUrl(product.thumbnail);
                  return (
                    <tr key={product.id} className="hover:bg-warm-ivory/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-soft-beige shrink-0 border border-light-beige">
                          <Image
                            src={imageSrc || 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=150&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-charcoal">
                        {product.name}
                      </td>
                      <td className="py-3.5 px-4 text-warm-gray">
                        {product.category || '-'}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-charcoal">
                        {formatRupiah(product.price)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-charcoal">
                        {product.stock}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          product.stock === 0 
                            ? 'bg-red-100 text-red-700' 
                            : product.stock <= 5 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {product.stock === 0 ? 'Habis' : product.stock <= 5 ? 'Stok Menipis' : 'Tersedia'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-warm-gray text-[11px]">
                        {new Date(product.updatedAt || product.createdAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/produk/${product.slug}`}
                          target="_blank"
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-warm-gray hover:text-charcoal hover:bg-soft-beige"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/produk/${product.id}/edit`}
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-deep-olive hover:bg-soft-beige"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteProductCandidate(product)}
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Product Cards View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
            {products.map((product) => {
              const imageSrc = getImageUrl(product.thumbnail);
              return (
                <div key={product.id} className="bg-white p-4 rounded-2xl border border-light-beige shadow-xs space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-soft-beige shrink-0 border border-light-beige">
                      <Image
                        src={imageSrc || 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=200&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-charcoal text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-warm-gray">
                        {product.category || '-'}
                      </p>
                      <p className="text-xs font-bold text-terracotta mt-0.5">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-light-beige text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      product.stock === 0 ? 'bg-red-100 text-red-700' : product.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Stok: {product.stock}
                    </span>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/produk/${product.id}/edit`}
                        className="px-3 py-1.5 bg-warm-ivory hover:bg-soft-beige rounded-lg text-deep-olive font-semibold text-xs flex items-center space-x-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteProductCandidate(product)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteProductCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-light-beige space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-normal text-charcoal">
                Hapus produk ini?
              </h3>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed font-sans">
              Produk <strong className="text-charcoal">{deleteProductCandidate.name}</strong> yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteProductCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-charcoal bg-warm-beige/50 hover:bg-warm-beige rounded-xl transition-colors"
                disabled={deleting}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-xs disabled:opacity-50"
                disabled={deleting}
              >
                {deleting ? 'Menghapus...' : 'Hapus Produk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
