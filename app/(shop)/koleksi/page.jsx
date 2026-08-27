'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramsStr = searchParams.toString();
    router.replace(`/produk${paramsStr ? `?${paramsStr}` : ''}`);
  }, [router, searchParams]);

  return null;
}

export default function KoleksiRedirectPage() {
  return (
    <Suspense fallback={null}>
      <RedirectContent />
    </Suspense>
  );
}
