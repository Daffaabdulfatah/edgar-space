const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');

// Public route to process WhatsApp Checkout with DB stock & price validation
router.post('/whatsapp', checkoutController.handleWhatsAppCheckout);

module.exports = router;
