import { redirect } from 'next/navigation';

export default async function KategoriSlugRedirectPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  redirect(`/koleksi?category=${slug}`);
}
