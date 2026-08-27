'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  FolderTree, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Loader2,
  Info 
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/libs/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals for deletion & warning
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [warningCandidate, setWarningCandidate] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchApi('/admin/categories');
      if (res.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Gagal mengambil daftar kategori.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteClick = (category) => {
    if (category.productCount > 0) {
      setWarningCandidate(category);
    } else {
      setDeleteCandidate(category);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;

    try {
      setDeleting(true);
      const res = await fetchApi(`/admin/categories/${deleteCandidate.id}`, {
        method: 'DELETE'
      });

      if (res.success) {
        setDeleteCandidate(null);
        fetchCategories();
      }
    } catch (err) {
      alert(err.message || 'Gagal menghapus kategori.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Kategori
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray mt-1 font-light">
            Kelola kategori produk Edgar Space.
          </p>
        </div>

        <Link
          href="/admin/kategori/tambah"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Kategori</span>
        </Link>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-20 bg-white rounded-2xl border border-light-beige flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-deep-olive" />
          <p className="text-xs text-warm-gray">Memuat daftar kategori...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-xs text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchCategories}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl"
          >
            Coba Lagi
          </button>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-light-beige text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-soft-beige flex items-center justify-center text-warm-gray mx-auto">
            <FolderTree className="w-8 h-8 opacity-60" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-charcoal font-normal">
              Belum ada kategori.
            </h3>
            <p className="text-xs text-warm-gray mt-1">
              Tambahkan kategori untuk mengelompokkan produk di toko.
            </p>
          </div>
          <Link
            href="/admin/kategori/tambah"
            className="inline-block px-5 py-2.5 rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold transition-colors"
          >
            + Tambah Kategori
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-light-beige shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-soft-beige/50 text-warm-gray uppercase text-[10px] tracking-wider border-b border-light-beige">
              <tr>
                <th className="py-3.5 px-4">Thumbnail</th>
                <th className="py-3.5 px-4">Nama Kategori</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Jumlah Produk</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-beige">
              {categories.map((cat) => {
                const imageSrc = getImageUrl(cat.thumbnail);
                return (
                  <tr key={cat.id} className="hover:bg-warm-ivory/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-soft-beige shrink-0 border border-light-beige">
                        <Image
                          src={imageSrc || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80'}
                          alt={cat.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-charcoal">
                      {cat.name}
                    </td>
                    <td className="py-3.5 px-4 text-warm-gray font-mono text-[11px]">
                      {cat.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-soft-beige text-charcoal">
                        {cat.productCount} produk
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-warm-gray text-[11px]">
                      {new Date(cat.updatedAt || cat.createdAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/kategori/${cat.id}/edit`}
                        className="inline-flex items-center justify-center p-1.5 rounded-lg text-deep-olive hover:bg-soft-beige"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(cat)}
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
      )}

      {/* Warning Modal (Category has products) */}
      {warningCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-light-beige space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-normal text-charcoal">
                Kategori Digunakan
              </h3>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed font-sans">
              Kategori ini masih digunakan oleh <strong className="text-charcoal">{warningCandidate.productCount} produk</strong>. Silakan pindahkan produk ke kategori lain terlebih dahulu.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setWarningCandidate(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-deep-olive hover:bg-deep-olive-hover rounded-xl transition-colors shadow-xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-light-beige space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-normal text-charcoal">
                Hapus kategori ini?
              </h3>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed font-sans">
              Kategori <strong className="text-charcoal">{deleteCandidate.name}</strong> yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
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
                {deleting ? 'Menghapus...' : 'Hapus Kategori'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
