import React from 'react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Syarat & Ketentuan — Edgar Space',
  description: 'Syarat dan ketentuan penggunaan layanan toko online Edgar Space.',
};

export default function SyaratPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Aturan Layanan
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Syarat &amp; Ketentuan
          </h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle text-xs sm:text-sm text-warm-gray leading-relaxed font-light font-sans">
          <p>
            Dengan mengakses dan membeli produk melalui situs web Edgar Space, Anda dianggap menyetujui seluruh syarat dan ketentuan berikut.
          </p>
          <h2 className="font-bold text-base text-charcoal pt-2">1. Ketentuan Umum</h2>
          <p>Seluruh harga yang tertera dalam mata uang Rupiah (IDR) dan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
          <h2 className="font-bold text-base text-charcoal pt-2">2. Ketersediaan Produk</h2>
          <p>Stok produk diperbarui secara berkala. Apabila pesanan mengalami kehabisan stok setelah pembayaran, tim kami akan memberikan opsi penggantian produk atau pemblokiran refund penuh.</p>
        </div>
      </Container>
    </div>
  );
}
