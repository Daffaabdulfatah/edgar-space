'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectAdminStock() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/stok');
  }, [router]);

  return null;
}
