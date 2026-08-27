const settingsService = require('../services/settings.service');
const { sendSuccess } = require('../utils/response');

async function getSettings(req, res, next) {
  try {
    const settings = await settingsService.getSettings();
    return sendSuccess(res, settings);
  } catch (error) {
    next(error);
  }
}

async function updateSettings(req, res, next) {
  try {
    const settings = await settingsService.updateSettings(req.body);
    return sendSuccess(res, settings, 'Pengaturan toko berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSettings,
  updateSettings
};
