const dashboardService = require('../services/dashboard.service');
const { sendSuccess } = require('../utils/response');

async function getDashboard(req, res, next) {
  try {
    const data = await dashboardService.getDashboardStats();
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboard
};
