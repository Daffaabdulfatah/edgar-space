const productService = require('../services/product.service');
const { sendSuccess } = require('../utils/response');

async function getProducts(req, res, next) {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      q: req.query.q || req.query.search,
      category: req.query.category,
      categoryId: req.query.categoryId,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      stockStatus: req.query.stockStatus,
      featured: req.query.featured,
      sort: req.query.sort
    };
    const result = await productService.getAllProducts(filters);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

async function getProductBySlug(req, res, next) {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    return sendSuccess(res, product);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    return sendSuccess(res, product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      isFeatured: req.body.isFeatured === true || req.body.isFeatured === 'true'
    };

    if (req.file) {
      data.thumbnail = `/uploads/products/${req.file.filename}`;
    } else if (req.body.thumbnail) {
      data.thumbnail = req.body.thumbnail;
    }

    const adminId = req.admin ? req.admin.id : null;
    const newProduct = await productService.createProduct(data, adminId);
    return sendSuccess(res, newProduct, 'Produk berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
      isFeatured: req.body.isFeatured !== undefined 
        ? (req.body.isFeatured === true || req.body.isFeatured === 'true') 
        : undefined
    };

    if (req.file) {
      data.thumbnail = `/uploads/products/${req.file.filename}`;
    } else if (req.body.thumbnail !== undefined) {
      data.thumbnail = req.body.thumbnail;
    }

    const updatedProduct = await productService.updateProduct(req.params.id, data);
    return sendSuccess(res, updatedProduct, 'Produk berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);
    return sendSuccess(res, null, 'Produk berhasil dihapus.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
