const prisma = require('../config/db');

/**
 * Update stock manually via database transaction
 * @param {number} productId 
 * @param {{ type: 'RESTOCK' | 'REDUCTION' | 'ADJUSTMENT', quantity: number, targetStock?: number, note?: string }} data 
 * @param {number} adminId 
 */
async function updateProductStock(productId, data, adminId) {
  const prodId = Number(productId);
  const { type, note } = data;
  const quantity = parseInt(data.quantity, 10);

  if (!['RESTOCK', 'REDUCTION', 'ADJUSTMENT'].includes(type)) {
    const error = new Error('Jenis perubahan stok tidak valid. Gunakan RESTOCK, REDUCTION, atau ADJUSTMENT.');
    error.statusCode = 400;
    throw error;
  }

  if (isNaN(quantity) || quantity <= 0) {
    const error = new Error('Jumlah stok harus lebih dari 0.');
    error.statusCode = 400;
    throw error;
  }

  // Execute in a database transaction
  const result = await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: prodId }
    });

    if (!product) {
      const error = new Error('Produk tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    const previousStock = product.stock;
    let newStock = previousStock;

    if (type === 'RESTOCK') {
      newStock = previousStock + quantity;
    } else if (type === 'REDUCTION') {
      if (previousStock < quantity) {
        const error = new Error(`Stok tidak mencukupi untuk pengurangan ini. Stok saat ini: ${previousStock}, jumlah pengurangan: ${quantity}.`);
        error.statusCode = 400;
        throw error;
      }
      newStock = previousStock - quantity;
    } else if (type === 'ADJUSTMENT') {
      // Direct adjustment to target quantity
      newStock = quantity;
    }

    if (newStock < 0) {
      const error = new Error('Stok tidak boleh kurang dari 0.');
      error.statusCode = 400;
      throw error;
    }

    // 1. Update product stock
    const updatedProduct = await tx.product.update({
      where: { id: prodId },
      data: { stock: newStock },
      include: {
        category: true
      }
    });

    // 2. Create StockMovement log
    const movement = await tx.stockMovement.create({
      data: {
        productId: prodId,
        type,
        quantity: type === 'ADJUSTMENT' ? Math.abs(newStock - previousStock) : quantity,
        previousStock,
        newStock,
        note: note ? note.trim() : null,
        adminId: adminId || null
      },
      include: {
        admin: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return {
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        stock: updatedProduct.stock,
        category: updatedProduct.category ? updatedProduct.category.name : null
      },
      movement
    };
  });

  return result;
}

/**
 * Get all stock movement logs
 * @param {{ limit?: number, page?: number, productId?: number }} options 
 */
async function getStockHistory(options = {}) {
  const limit = options.limit ? parseInt(options.limit, 10) : 50;
  const page = options.page ? parseInt(options.page, 10) : 1;
  const skip = (page - 1) * limit;

  const where = {};
  if (options.productId) {
    where.productId = Number(options.productId);
  }

  const [total, movements] = await Promise.all([
    prisma.stockMovement.count({ where }),
    prisma.stockMovement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        product: {
          select: { id: true, name: true, slug: true, thumbnail: true }
        },
        admin: {
          select: { id: true, name: true, email: true }
        }
      }
    })
  ]);

  const typeTranslations = {
    RESTOCK: 'Penambahan Stok',
    REDUCTION: 'Pengurangan Stok',
    ADJUSTMENT: 'Penyesuaian Stok'
  };

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    movements: movements.map((m) => ({
      id: m.id,
      productId: m.productId,
      productName: m.product ? m.product.name : 'Produk Dihapus',
      productThumbnail: m.product ? m.product.thumbnail : null,
      type: m.type,
      typeLabel: typeTranslations[m.type] || m.type,
      quantity: m.quantity,
      previousStock: m.previousStock,
      newStock: m.newStock,
      note: m.note,
      adminName: m.admin ? m.admin.name : 'Sistem / Admin',
      createdAt: m.createdAt
    }))
  };
}

module.exports = {
  updateProductStock,
  getStockHistory
};
