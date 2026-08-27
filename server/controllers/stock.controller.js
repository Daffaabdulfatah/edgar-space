const stockService = require('../services/stock.service');
const { sendSuccess } = require('../utils/response');

/**
 * Handle manual stock change (RESTOCK / REDUCTION / ADJUSTMENT)
 */
async function updateStock(req, res, next) {
  try {
    const { type, quantity, note } = req.body;
    const adminId = req.admin ? req.admin.id : null;

    const result = await stockService.updateProductStock(
      req.params.id,
      { type, quantity, note },
      adminId
    );

    return sendSuccess(res, result, 'Perubahan stok berhasil disimpan.');
  } catch (error) {
    next(error);
  }
}

/**
 * Handle stock movement history list
 */
async function getStockHistory(req, res, next) {
  try {
    const history = await stockService.getStockHistory({
      limit: req.query.limit,
      page: req.query.page,
      productId: req.query.productId
    });

    return sendSuccess(res, history);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateStock,
  getStockHistory
};
