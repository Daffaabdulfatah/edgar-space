import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Sparkles, Heart, ShieldCheck, Leaf, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami — Edgar Space',
  description: 'Mengenal kisah, visi, dan filosofi Edgar Space dalam menyediakan furniture, dekorasi, dan perlengkapan rumah modern bergaya hangat dan fungsional.',
};

export default function TentangKamiPage() {
  const brandValues = [
    {
      icon: Sparkles,
      title: "Desain Modern & Timeless",
      description: "Setiap kurasi produk menggabungkan elemen estetika kontemporer yang elegan dan tidak terbatas oleh tren sesaat."
    },
    {
      icon: Leaf,
      title: "Material Natural & Ramah Lingkungan",
      description: "Kami mengutamakan bahan berkualitas tinggi dari kayu natural, keramik halus, dan logam tahan lama yang ramah bagi keluarga."
    },
    {
      icon: Heart,
      title: "Kenyamanan & Fungsionalitas",
      description: "Bukan hanya indah dipandang, setiap barang dirancang untuk mempermudah rutinitas harian dan menciptakan kenyamanan rumah."
    },
    {
      icon: ShieldCheck,
      title: "Jaminan Kualitas Mutlak",
      description: "Semua item melewati pemeriksaan standar QC yang ketat sebelum dikemas dan dikirimkan ke tangan Anda."
    }
  ];

  const milestones = [
    { number: "100%", label: "Produk Terkurasi", desc: "Dikurasi mandiri berstandar tinggi" },
    { number: "QC", label: "Pemeriksaan Fisik", desc: "Diuji kelayakannya sebelum dikirim" },
    { number: "Safe", label: "Garansi Tiba Aman", desc: "Proteksi penuh selama pengiriman" },
    { number: "Fresh", label: "Desain Modern", desc: "Koleksi gaya interior terkini" }
  ];

  return (
    <div className="bg-warm-ivory min-h-screen py-8 sm:py-14">
      <Container className="space-y-12 sm:space-y-16">
        
        {/* HERO BRAND STORY BANNER */}
        <section className="relative rounded-3xl overflow-hidden bg-charcoal text-white p-8 sm:p-14 lg:p-16 shadow-lg border border-light-beige min-h-[380px] flex flex-col justify-end">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
              alt="Interior Rumah Edgar Space"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/20 border border-terracotta/40 text-terracotta text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Filosofi Edgar Space</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF7F2] leading-tight">
              Menciptakan Ruang Hangat & Estetis untuk Setiap Rumah.
            </h1>

            <p className="text-xs sm:text-base text-[#C5C1B8] font-light leading-relaxed max-w-2xl">
              Kami percaya bahwa rumah adalah perlindungan paling berharga. Di Edgar Space, kami mendedikasikan setiap produk untuk menghadirkan harmoni antara fungsi modern dan kehangatan rasa alami.
            </p>
          </div>
        </section>

        {/* NARRATIVE SECTION: VISI & KISAH KAMI */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-light-beige shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-deep-olive uppercase block">
                Kisah & Visi Kami
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                Lebih dari Sekadar Furniture, Ini Tentang Pengalaman Hunian.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
              Berdiri dari semangat untuk menghadirkan interior berkualitas tanpa kerumitan, Edgar Space menjadi tempat terbaik menemukan perabot, dekorasi, dan perlengkapan rumah bergaya minimalis hangat.
            </p>

            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
              Kami secara khusus menguji dan mengurasi setiap material — dari sentuhan kayu hangat, keramik bertekstur, hingga pencahayaan lembut — untuk memastikan hunian Anda terasa lebih personal, bersih, dan menenangkan.
            </p>

            <div className="pt-2 space-y-2.5">
              {[
                "Kurasi independen berstandar kualitas ekspor",
                "Desain yang menyatu harmoni dengan berbagai gaya rumah",
                "Pengemasan ekstra aman dengan jaminan garansi tiba intact"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs text-charcoal font-medium">
                  <CheckCircle2 className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-subtle border border-light-beige bg-soft-beige">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
              alt="Suasana Ruang Keluarga Edgar Space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* CORE BRAND VALUES GRID */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-terracotta uppercase block">
              Prinsip Kerja
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
              4 Nilai Utama Edgar Space
            </h2>
            <p className="text-xs sm:text-sm text-warm-gray font-light">
              Komitmen kami dalam setiap detail produk dan layanan yang Anda terima.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-light-beige shadow-xs space-y-4 hover:shadow-subtle hover:border-deep-olive/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-sans text-base font-bold text-charcoal">
                      {val.title}
                    </h3>
                    <p className="text-xs text-warm-gray font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* STATS MILESTONES BANNER */}
        <section className="bg-[#1E251E] text-white p-8 sm:p-12 rounded-3xl border border-[#2D382D] shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#2D382D]">
            {milestones.map((ms, idx) => (
              <div key={idx} className={`space-y-1 ${idx > 0 ? 'pt-4 lg:pt-0' : ''}`}>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                  {ms.number}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-terracotta font-mono">
                  {ms.label}
                </div>
                <div className="text-[11px] text-[#A8A49C] font-light">
                  {ms.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-light-beige shadow-xs text-center max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-warm-beige flex items-center justify-center text-deep-olive mx-auto shadow-xs">
            <Award className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
              Siap Mengubah Suasana Rumah Anda?
            </h2>
            <p className="text-xs sm:text-sm text-warm-gray font-light max-w-lg mx-auto leading-relaxed">
              Jelajahi seluruh koleksi perabot dan dekorasi pilihan kami, lalu ciptakan ruang yang lebih nyaman hari ini.
            </p>
          </div>

          <div>
            <Link
              href="/produk"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Jelajahi Katalog Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </Container>
    </div>
  );
}

