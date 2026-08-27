const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Public Product Endpoints
router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);

module.exports = router;
