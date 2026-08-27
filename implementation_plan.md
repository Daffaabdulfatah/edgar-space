# Implementation Plan — Edgar Space Phase 3: Public Storefront REST API Integration

Integration of the **Edgar Space** public storefront (`Next.js App Router`) with the Express REST API backend and PostgreSQL Prisma database.

## Phase 3 Accomplishments & System Architecture

> [!IMPORTANT]
> - **Unified Backend Data Flow**: All public storefront components (Homepage, Catalog, Product Detail, Category Navigation) dynamically query live data from Express REST API endpoints (`/api/products`, `/api/categories`).
> - **Pre-Validation WhatsApp Checkout**: Cart orders are validated against real-time stock levels in the PostgreSQL database before generating encoded WhatsApp ordering URLs.
> - **Resilient Fallback Design**: If backend API endpoints are unreachable during initial deployment, storefront components seamlessly fall back to local curated data structures without breaking page layout or crashing.
> - **100% Bahasa Indonesia UI**: Formatted currency (`Rp`), stock indicators ("Tersedia", "Stok Terbatas", "Habis"), filters, search parameters, and checkout modals remain completely in Bahasa Indonesia.

---

## Detailed Implementation Summary

### 1. API Utilities & Media Handler
- **[libs/api.js](file:///Users/4ntith3sis/Documents/Edgar-space/libs/api.js)**:
  - `fetchApi()`: Universal wrapper around `fetch` with environment-based base URL (`NEXT_PUBLIC_API_URL`), JSON parsing, credentials support, and structured error throwing.
  - `getImageUrl()`: Handles absolute URLs, relative backend upload paths (`/uploads/products/...`), and SVG fallbacks.

---

### 2. Homepage Dynamic API Integration
- **[components/home/CategorySection.jsx](file:///Users/4ntith3sis/Documents/Edgar-space/components/home/CategorySection.jsx)**:
  - Fetches category list from `/api/categories`.
  - Renders 7 arch category cards with smooth hover scale and active link routing to `/produk?kategori=[slug]`.
- **[components/home/FeaturedProducts.jsx](file:///Users/4ntith3sis/Documents/Edgar-space/components/home/FeaturedProducts.jsx)**:
  - Fetches featured products grid from `/api/products?limit=6`.
  - Displays product thumbnail, category, title, formatted price in IDR (`formatRupiah`), rating, and stock availability badge.

---

### 3. Interactive Catalog & Filtering Page
- **[app/(shop)/produk/page.jsx](file:///Users/4ntith3sis/Documents/Edgar-space/app/(shop)/produk/page.jsx)**:
  - Live search input filter (`?q=...` or `?search=...`).
  - Dropdown & pill category filter (`?kategori=...`).
  - Sorting parameters (`newest`, `name-asc`, `price-asc`, `price-desc`).
  - Server-calculated pagination (`page` & `limit=12`).
  - Category Hero banner rendering title & description dynamically.
  - Skeleton loading state (`ProductCardSkeleton.jsx`) and empty search state.

---

### 4. Product Detail & Related Products Page
- **[app/(shop)/produk/[slug]/page.jsx](file:///Users/4ntith3sis/Documents/Edgar-space/app/(shop)/produk/[slug]/page.jsx)**:
  - Dynamic route loading product details via `/api/products/[slug]`.
  - Thumbnail gallery selector.
  - Quantity counter (`ProductQuantity`) bounded by exact inventory stock level.
  - Category-based related products section ("Produk Serupa").
  - Breadcrumb navigation (`Beranda > Produk > [Kategori] > [Nama Produk]`).
  - Add to cart trigger (`CartContext`).

---

### 5. Cart & WhatsApp Ordering API
- **[app/(shop)/keranjang/page.jsx](file:///Users/4ntith3sis/Documents/Edgar-space/app/(shop)/keranjang/page.jsx)**:
  - Cart list management (item quantity modification, item removal, subtotal & total tagihan calculation).
  - Customer information form (Nama, Nomor WhatsApp, Kota/Alamat, Catatan).
  - API pre-validation checkout trigger (`/api/checkout/whatsapp`) verifying live stock in database before opening WhatsApp message.

---

## Verification Plan

### Automated Checks
1. ESLint code validation: `npm run lint` — **Passed (0 errors)**
2. Next.js production build: `npm run build` — **Passed (32 static & dynamic routes compiled successfully)**

### Manual Verification
1. Server startup: `npm run dev:all` (runs Express on `:5050` & Next.js on `:3000`).
2. Public Storefront Navigation: Test browsing `/`, `/produk`, `/produk/[slug]`, `/keranjang`.
3. Admin Panel Verification: Access `/admin/login`, manage products, and observe live updates reflecting on public storefront.
