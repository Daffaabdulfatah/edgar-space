import React from 'react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Terms of Service — Edgar Space',
  description: 'Terms of service and legal agreement for Edgar Space users.',
};

export default function TermsPage() {
  return (
    <div className="bg-warm-ivory py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-semibold tracking-widest text-deep-olive uppercase block mb-2">
            Legal Terms
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 rounded-3xl border border-light-beige shadow-subtle text-xs sm:text-sm text-warm-gray leading-relaxed font-light font-sans">
          <p>
            Welcome to Edgar Space. By accessing our platform, products, and services, you agree to comply with our standard terms of service.
          </p>
        </div>
      </Container>
    </div>
  );
}
