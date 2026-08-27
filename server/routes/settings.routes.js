const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to fetch store settings (WhatsApp number, store info)
router.get('/', settingsController.getSettings);

// Protected admin route to update store settings
router.put('/', authMiddleware, settingsController.updateSettings);

module.exports = router;
