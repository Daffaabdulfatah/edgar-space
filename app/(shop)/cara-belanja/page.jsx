import React from 'react';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export const metadata = {
  title: 'Cara Belanja — Edgar Space',
  description: 'Panduan langkah mudah berbelanja produk dekorasi rumah di Edgar Space.',
};

export default function CaraBelanjaPage() {
  const steps = [
    { title: "Pilih Produk", desc: "Jelajahi kategori atau gunakan kolom pencarian untuk memilih produk pilihan Anda." },
    { title: "Masukkan ke Keranjang", desc: "Klik tombol Tambah ke Keranjang atau langsung hubungi tim kami melalui tombol WhatsApp." },
    { title: "Konfirmasi Pesanan", desc: "Periksa kembali rincian produk, alamat pengiriman, serta opsi pengiriman yang tersedia." },
    { title: "Pembayaran & Pengiriman", desc: "Lakukan pembayaran melalui metode pembayaran yang tersedia dan pesanan Anda akan segera diproses." }
  ];

  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Panduan Pembelian
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Cara Berbelanja
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed">
            4 langkah sederhana untuk melengkapi ruang hunian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-light-beige shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold text-terracotta mb-4 block">0{idx + 1}</span>
                <h2 className="font-sans text-base font-bold text-charcoal mb-2">{step.title}</h2>
                <p className="text-xs text-warm-gray leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/koleksi"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-deep-olive text-white font-sans text-xs font-semibold hover:bg-deep-olive-hover transition-colors"
          >
            Mulai Belanja Sekarang
          </Link>
        </div>
      </Container>
    </div>
  );
}
