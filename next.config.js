/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/koleksi',
        destination: '/produk',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5050/uploads/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:5050/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

