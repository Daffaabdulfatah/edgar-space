/**
 * Dynamic Next.js robots.txt configuration
 */
export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/api/auth/']
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
