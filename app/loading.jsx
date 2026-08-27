import React from 'react';
import Container from '@/components/ui/Container';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 bg-warm-ivory">
      <Container className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-light-beige border-t-deep-olive rounded-full animate-spin mb-4" />
        <p className="font-serif text-xl text-charcoal font-normal">
          Memuat Edgar Space...
        </p>
        <p className="text-xs text-warm-gray font-sans font-light mt-1">
          Menyiapkan ruang nyaman untuk Anda
        </p>
      </Container>
    </div>
  );
}
