const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const adminRoutes = require('./admin.routes');
const settingsRoutes = require('./settings.routes');
const checkoutRoutes = require('./checkout.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/admin', adminRoutes);
router.use('/settings', settingsRoutes);
router.use('/checkout', checkoutRoutes);



// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
