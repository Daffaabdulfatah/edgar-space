import React from 'react';

import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CollectionBanner from '@/components/home/CollectionBanner';
import AboutSection from '@/components/home/AboutSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const revalidate = 0;

async function getInitialHomepageData() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://edgar-space.vercel.app/api';

  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${API_BASE}/categories`, {
        cache: 'no-store'
      })
        .then((r) => r.json())
        .catch(() => null),

      fetch(`${API_BASE}/products?limit=6`, {
        cache: 'no-store'
      })
        .then((r) => r.json())
        .catch(() => null)
    ]);

    const categories =
      catRes &&
      catRes.success &&
      Array.isArray(catRes.data)
        ? catRes.data
        : [];

    const products =
      prodRes && prodRes.success
        ? Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data?.products || []
        : [];

    return { categories, products };
  } catch (err) {
    console.error('Homepage API Error:', err);
    return {
      categories: [],
      products: []
    };
  }
}

export default async function HomePage() {
  const { categories, products } = await getInitialHomepageData();

  return (
    <>
      <Hero />
      <CategorySection initialCategories={categories} />
      <FeaturedProducts initialProducts={products} />
      <CollectionBanner />
      <AboutSection />
      <TestimonialSection />
      <NewsletterSection />
    </>
  );
}
