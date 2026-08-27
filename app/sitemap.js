import { fetchApi } from '@/libs/api';

/**
 * Dynamic Next.js sitemap.xml generator
 */
export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${siteUrl}/koleksi`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    }
  ];

  let productRoutes = [];

  try {
    const productsRes = await fetchApi('/products?limit=50');

    const productList = Array.isArray(productsRes.data) 
      ? productsRes.data 
      : (productsRes.data?.products || []);

    productRoutes = productList.map((prod) => ({
      url: `${siteUrl}/koleksi/${prod.slug}`,
      lastModified: prod.updatedAt || currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    }));
  } catch (err) {
    console.error('Failed to generate dynamic sitemap routes:', err);
  }

  return [...staticRoutes, ...productRoutes];
}
