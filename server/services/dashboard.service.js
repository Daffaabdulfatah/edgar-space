const prisma = require('../config/db');

/**
 * Get aggregated dashboard metrics and recent activity
 */
async function getDashboardStats() {
  const [
    totalProducts,
    totalCategories,
    lowStockProducts,
    outOfStockProducts,
    recentMovements,
    lowStockList
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({
      where: {
        stock: {
          gt: 0,
          lte: 5
        }
      }
    }),
    prisma.product.count({
      where: {
        stock: 0
      }
    }),
    prisma.stockMovement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        product: {
          select: { id: true, name: true, slug: true, thumbnail: true }
        },
        admin: {
          select: { id: true, name: true }
        }
      }
    }),
    prisma.product.findMany({
      where: {
        stock: {
          lte: 5
        }
      },
      orderBy: { stock: 'asc' },
      take: 5,
      include: {
        category: {
          select: { name: true }
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
    stats: {
      totalProducts,
      totalCategories,
      lowStockProducts,
      outOfStockProducts
    },
    recentMovements: recentMovements.map((m) => ({
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
      adminName: m.admin ? m.admin.name : 'Admin',
      createdAt: m.createdAt
    })),
    lowStockList: lowStockList.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      stock: p.stock,
      price: Number(p.price),
      thumbnail: p.thumbnail,
      category: p.category ? p.category.name : null
    }))
  };
}

module.exports = {
  getDashboardStats
};
