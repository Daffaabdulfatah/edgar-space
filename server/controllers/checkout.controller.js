const checkoutService = require('../services/checkout.service');
const { sendSuccess, sendError } = require('../utils/response');

async function handleWhatsAppCheckout(req, res, next) {
  try {
    const { items, customer } = req.body;
    const result = await checkoutService.processWhatsAppCheckout({ items, customer });
    return sendSuccess(res, result, 'Pesan checkout WhatsApp berhasil dibuat.');
  } catch (error) {
    if (error.validationDetails) {
      return sendError(res, error.message, 400, error.validationDetails);
    }
    next(error);
  }
}

module.exports = {
  handleWhatsAppCheckout
};
