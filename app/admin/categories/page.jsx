'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectAdminCategories() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/kategori');
  }, [router]);

  return null;
}
