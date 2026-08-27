import React from 'react';
import Container from '@/components/ui/Container';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Kontak — Edgar Space',
  description: 'Hubungi tim customer support Edgar Space untuk bantuan produk, pesanan, dan informasi layanan pelanggan.',
};

export default function KontakPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Layanan Pelanggan
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Hubungi Kami
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray font-sans font-light leading-relaxed">
            Tim kami siap membantu Anda dengan informasi produk, pembelian, atau pertanyaan lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-sans text-xl font-bold text-charcoal mb-6">
                Informasi Kontak
              </h2>

              <ul className="space-y-5 text-sm text-charcoal font-sans">
                <li className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-deep-olive/10 flex items-center justify-center text-deep-olive shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-gray block">Telepon / WhatsApp</span>
                    <span className="font-semibold text-charcoal">0812-3456-7890</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-deep-olive/10 flex items-center justify-center text-deep-olive shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-gray block">Email Support</span>
                    <span className="font-semibold text-charcoal">halo@edgarspace.com</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-deep-olive/10 flex items-center justify-center text-deep-olive shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-gray block">Alamat Showroom</span>
                    <span className="font-semibold text-charcoal leading-snug">
                      Jl. Setiabudi No. 45, Bandung, Jawa Barat, Indonesia
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-deep-olive/10 flex items-center justify-center text-deep-olive shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-gray block">Jam Operasional</span>
                    <span className="font-semibold text-charcoal">
                      Senin – Sabtu: 09.00 – 18.00 WIB
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-light-beige">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold transition-colors space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle">
            <h2 className="font-sans text-xl font-bold text-charcoal mb-2">
              Kirim Pesan
            </h2>
            <p className="text-xs text-warm-gray mb-6">
              Isi formulir di bawah ini dan kami akan membalas pesan Anda sesegera mungkin.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/50 text-xs text-charcoal focus:outline-none focus:border-deep-olive"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/50 text-xs text-charcoal focus:outline-none focus:border-deep-olive"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Pesan
                </label>
                <textarea
                  rows="4"
                  placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-light-beige bg-warm-ivory/50 text-xs text-charcoal focus:outline-none focus:border-deep-olive"
                />
              </div>

              <Button type="submit" variant="terracotta" size="lg" className="w-full py-3 rounded-xl font-semibold">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
