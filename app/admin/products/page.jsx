'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectAdminProducts() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/produk');
  }, [router]);

  return null;
}
