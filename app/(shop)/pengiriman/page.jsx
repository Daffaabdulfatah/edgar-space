import React from 'react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Informasi Pengiriman — Edgar Space',
  description: 'Ketentuan dan estimasi waktu pengiriman barang produk Edgar Space ke seluruh Indonesia.',
};

export default function PengirimanPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Layanan Ekspedisi
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Informasi Pengiriman
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed">
            Kami memastikan setiap produk dikemas secara aman dan dikirim tepat waktu.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle text-xs sm:text-sm text-charcoal font-sans">
          <div>
            <h2 className="font-bold text-base mb-2 text-charcoal">Jangkauan Pengiriman</h2>
            <p className="text-warm-gray leading-relaxed font-light">
              Edgar Space melayani pengiriman ke seluruh kota dan kabupaten di wilayah Indonesia melalui mitra logistik terpercaya.
            </p>
          </div>

          <div className="pt-4 border-t border-light-beige">
            <h2 className="font-bold text-base mb-2 text-charcoal">Estimasi Waktu Sampai</h2>
            <ul className="list-disc pl-5 text-warm-gray leading-relaxed font-light space-y-1">
              <li><strong>Jabodetabek & Bandung:</strong> 1 – 3 Hari Kerja</li>
              <li><strong>Pulau Jawa (Lainnya):</strong> 2 – 4 Hari Kerja</li>
              <li><strong>Luar Pulau Jawa:</strong> 3 – 7 Hari Kerja</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-light-beige">
            <h2 className="font-bold text-base mb-2 text-charcoal">Standar Pengemasan</h2>
            <p className="text-warm-gray leading-relaxed font-light">
              Setiap produk dilapisi bubble wrap berlapis, pelindung sudut, serta box karton tebal khusus untuk menjaga keutuhan produk keramik, kaca, maupun barang dekoratif lainnya.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
