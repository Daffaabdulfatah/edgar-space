'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function KoleksiSlugRedirectPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      router.replace(`/produk/${params.slug}`);
    } else {
      router.replace('/produk');
    }
  }, [router, params]);

  return null;
}
