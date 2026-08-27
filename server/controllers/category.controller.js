const categoryService = require('../services/category.service');
const { sendSuccess } = require('../utils/response');

async function getCategories(req, res, next) {
  try {
    const categories = await categoryService.getAllCategories();
    return sendSuccess(res, categories);
  } catch (error) {
    next(error);
  }
}

async function getCategoryBySlug(req, res, next) {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      q: req.query.q || req.query.search,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      stockStatus: req.query.stockStatus,
      sort: req.query.sort
    };
    const category = await categoryService.getCategoryBySlug(req.params.slug, options);
    return sendSuccess(res, category);
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return sendSuccess(res, category);
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description
    };

    if (req.file) {
      data.thumbnail = `/uploads/categories/${req.file.filename}`;
    } else if (req.body.thumbnail) {
      data.thumbnail = req.body.thumbnail;
    }

    const newCategory = await categoryService.createCategory(data);
    return sendSuccess(res, newCategory, 'Kategori berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description
    };

    if (req.file) {
      data.thumbnail = `/uploads/categories/${req.file.filename}`;
    } else if (req.body.thumbnail !== undefined) {
      data.thumbnail = req.body.thumbnail;
    }

    const updatedCategory = await categoryService.updateCategory(req.params.id, data);
    return sendSuccess(res, updatedCategory, 'Kategori berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await categoryService.deleteCategory(req.params.id);
    return sendSuccess(res, null, 'Kategori berhasil dihapus.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
