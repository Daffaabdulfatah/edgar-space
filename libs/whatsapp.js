import { formatRupiah } from './utils.js';

/**
 * Get sanitized international WhatsApp phone number
 * @returns {string}
 */
export function getWhatsAppNumber() {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
  // Remove +, spaces, dashes, parentheses
  return rawNumber.replace(/[^0-9]/g, '');
}

/**
 * Get public site URL for product links
 * @returns {string}
 */
export function getSiteUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

/**
 * Generate formatted WhatsApp order inquiry message
 * @param {{ product: { name: string, price: number, slug: string }, quantity: number }} params 
 * @returns {string}
 */
export function createWhatsAppMessage({ product, quantity = 1 }) {
  if (!product) return '';

  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/koleksi/${product.slug}`;
  const priceNum = Number(product.price) || 0;
  const subtotal = priceNum * quantity;

  return `Halo Edgar Space, saya tertarik untuk memesan produk berikut:

Produk: ${product.name}
Jumlah: ${quantity}
Harga: ${formatRupiah(priceNum)}
Subtotal: ${formatRupiah(subtotal)}

Link Produk:
${productUrl}

Apakah produk tersebut masih tersedia?

Terima kasih.`;
}

/**
 * Generate complete WhatsApp Web / App redirection URL
 * @param {{ product: { name: string, price: number, slug: string }, quantity: number }} params 
 * @returns {string}
 */
export function createWhatsAppUrl({ product, quantity = 1 }) {
  const phoneNumber = getWhatsAppNumber();
  const message = createWhatsAppMessage({ product, quantity });
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
