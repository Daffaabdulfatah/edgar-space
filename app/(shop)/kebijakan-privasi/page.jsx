import React from 'react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Kebijakan Privasi — Edgar Space',
  description: 'Kebijakan privasi dan perlindungan data pengguna Edgar Space.',
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Perlindungan Data
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Kebijakan Privasi
          </h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle text-xs sm:text-sm text-warm-gray leading-relaxed font-light font-sans">
          <p>
            Edgar Space berkomitmen menjaga kerahasiaan dan keamanan data pribadi Anda saat menggunakan layanan kami.
          </p>
          <h2 className="font-bold text-base text-charcoal pt-2">Pengumpulan Data</h2>
          <p>Informasi seperti nama, nomor telepon, email, dan alamat pengiriman hanya digunakan untuk memproses pengiriman dan komunikasi transaksi Anda.</p>
        </div>
      </Container>
    </div>
  );
}
