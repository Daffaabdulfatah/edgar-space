import React from 'react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Retur & Refund — Edgar Space',
  description: 'Kebijakan pengembalian barang dan dana di Edgar Space.',
};

export default function ReturPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Garansi &amp; Pengembalian
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Kebijakan Retur &amp; Refund
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed">
            Komitmen kami untuk memberikan kepuasan berbelanja bagi setiap pelanggan.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle text-xs sm:text-sm text-charcoal font-sans">
          <div>
            <h2 className="font-bold text-base mb-2 text-charcoal">Syarat Pengajuan Retur</h2>
            <ul className="list-disc pl-5 text-warm-gray leading-relaxed font-light space-y-1">
              <li>Pengajuan dilakukan maksimal 3x24 jam setelah barang diterima.</li>
              <li>Wajib menyertakan foto dan video unboxing paket tanpa terputus.</li>
              <li>Kerusakan fisik barang terjadi akibat cacat produksi atau proses pengiriman.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-light-beige">
            <h2 className="font-bold text-base mb-2 text-charcoal">Proses Pengembalian Dana (Refund)</h2>
            <p className="text-warm-gray leading-relaxed font-light">
              Setelah barang retur diterima dan diverifikasi oleh tim kami, pengembalian dana akan diproses dalam waktu 1-3 hari kerja ke rekening bank pemesan.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
