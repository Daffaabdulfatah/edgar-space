const prisma = require('../config/db');

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Validate cart items against DB stock & price, then format WhatsApp Checkout URL
 * DOES NOT DECREASE STOCK!
 */
async function processWhatsAppCheckout({ items, customer }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Keranjang belanja kosong.');
    error.statusCode = 400;
    throw error;
  }

  // 1. Extract product IDs
  const productIds = items.map((item) => Number(item.productId)).filter(Boolean);

  // 2. Fetch current product data from DB
  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    },
    include: {
      category: { select: { name: true } }
    }
  });

  const dbProductMap = new Map(dbProducts.map((p) => [p.id, p]));

  const validatedItems = [];
  const errors = [];
  let calculatedTotal = 0;

  // 3. Validate each item's existence, price, and stock
  for (const item of items) {
    const pId = Number(item.productId);
    const qty = parseInt(item.quantity, 10) || 1;
    const dbProd = dbProductMap.get(pId);

    if (!dbProd) {
      errors.push(`Produk dengan ID ${pId} sudah tidak tersedia.`);
      continue;
    }

    if (dbProd.stock < qty) {
      errors.push(
        `Stok produk "${dbProd.name}" berubah. Jumlah maksimum yang tersedia saat ini adalah ${dbProd.stock}.`
      );
      continue;
    }

    const price = Number(dbProd.price);
    const subtotal = price * qty;
    calculatedTotal += subtotal;

    validatedItems.push({
      productId: dbProd.id,
      name: dbProd.name,
      slug: dbProd.slug,
      price: price,
      quantity: qty,
      subtotal: subtotal,
      availableStock: dbProd.stock,
      categoryName: dbProd.category ? dbProd.category.name : null
    });
  }

  // If there are validation errors (out of stock, missing product), return error details
  if (errors.length > 0) {
    const error = new Error(errors.join('\n'));
    error.statusCode = 400;
    error.validationDetails = {
      errors,
      validatedItems
    };
    throw error;
  }

  // 4. Fetch store settings for WhatsApp phone number
  let storeSettings = await prisma.storeSetting.findUnique({ where: { id: 1 } });
  let phone = storeSettings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  // 5. Construct WhatsApp Text Message
  let message = `Halo Edgar Space,\n\nSaya ingin melakukan pemesanan:\n\n`;

  if (customer && (customer.name || customer.phone || customer.address)) {
    if (customer.name) message += `Nama: ${customer.name}\n`;
    if (customer.phone) message += `Nomor WA: ${customer.phone}\n`;
    if (customer.address) message += `Alamat: ${customer.address}\n`;
    if (customer.note) message += `Catatan: ${customer.note}\n`;
    message += `\n`;
  }

  message += `Detail Pesanan:\n`;
  validatedItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Jumlah: ${item.quantity}\n`;
    message += `   Harga: ${formatRupiah(item.price)}\n`;
    message += `   Subtotal: ${formatRupiah(item.subtotal)}\n\n`;
  });

  message += `-------------------------\n`;
  message += `Total Tagihan: ${formatRupiah(calculatedTotal)}\n`;
  message += `-------------------------\n\n`;
  message += `Mohon informasi ketersediaan dan proses pembayaran/pengiriman selanjutnya.\n\nTerima kasih.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return {
    whatsappUrl,
    whatsappNumber: cleanPhone,
    message,
    totalPrice: calculatedTotal,
    totalCount: validatedItems.reduce((acc, i) => acc + i.quantity, 0),
    items: validatedItems
  };
}

module.exports = {
  processWhatsAppCheckout
};
