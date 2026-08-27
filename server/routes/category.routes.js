const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Public Category Endpoints
router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

module.exports = router;
