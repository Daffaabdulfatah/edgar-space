import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 bg-warm-ivory">
      <Container className="text-center max-w-lg">
        <span className="font-serif text-7xl sm:text-8xl text-deep-olive font-normal block mb-4 opacity-90">
          404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed mb-8">
          Halaman yang kamu cari tidak tersedia atau mungkin telah dipindahkan. Silakan kembali ke beranda atau telusuri koleksi produk kami.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-btn bg-deep-olive hover:bg-deep-olive-hover text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/koleksi"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-btn bg-white border border-light-beige hover:border-charcoal text-charcoal text-xs font-semibold shadow-xs transition-colors"
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </Container>
    </div>
  );
}
