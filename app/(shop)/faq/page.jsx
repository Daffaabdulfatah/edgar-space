import React from 'react';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export const metadata = {
  title: 'FAQ — Edgar Space',
  description: 'Pertanyaan yang sering diajukan mengenai produk, pemesanan, pengiriman, dan garansi di Edgar Space.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Bagaimana cara melakukan pemesanan di Edgar Space?",
      a: "Anda dapat memilih produk yang diinginkan dari katalog, menentukan jumlah, lalu menekan tombol Tambah ke Keranjang atau pesan langsung melalui tombol Order WhatsApp."
    },
    {
      q: "Apakah seluruh produk dijamin asli dan berkualitas?",
      a: "Ya, setiap produk Edgar Space telah melewati proses kontrol kualitas ketat untuk memastikan material, fungsi, dan finishing terbaik."
    },
    {
      q: "Berapa lama waktu pengiriman barang?",
      a: "Pengiriman wilayah Jabodetabek & Bandung membutuhkan waktu 1-3 hari kerja. Untuk wilayah lainnya berkisar 3-5 hari kerja."
    },
    {
      q: "Apakah ada garansi untuk barang yang rusak saat pengiriman?",
      a: "Ya, kami memberikan garansi 100% penggantian barang jika terjadi kerusakan akibat pengiriman dengan mencantumkan video unboxing."
    },
    {
      q: "Metode pembayaran apa saja yang diterima?",
      a: "Kami menerima transfer bank resmi, QRIS, e-wallet, dan konfirmasi langsung via tim WhatsApp Customer Service kami."
    }
  ];

  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Pertanyaan Umum
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed">
            Temukan jawaban lengkap atas pertanyaan seputar layanan dan produk Edgar Space.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-light-beige shadow-subtle">
              <h2 className="font-sans text-sm sm:text-base font-bold text-charcoal mb-2">
                {faq.q}
              </h2>
              <p className="text-xs sm:text-sm text-warm-gray font-light leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-light-beige">
          <p className="text-xs text-warm-gray mb-4">
            Belum menemukan jawaban yang Anda cari?
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-terracotta text-white font-sans text-xs font-semibold hover:bg-terracotta-hover transition-colors"
          >
            Hubungi Customer Support
          </Link>
        </div>
      </Container>
    </div>
  );
}
