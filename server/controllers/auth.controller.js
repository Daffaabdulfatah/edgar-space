const authService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response');

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Handle Admin Login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { admin, token } = await authService.login(email, password);

    // Set HTTP-only Cookie
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/'
    });

    return sendSuccess(res, { admin }, 'Berhasil masuk.');
  } catch (error) {
    next(error);
  }
}

/**
 * Handle Admin Logout
 */
async function logout(req, res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return sendSuccess(res, null, 'Berhasil keluar.');
}

/**
 * Get Current Authenticated Admin Profile
 */
async function getMe(req, res, next) {
  try {
    if (!req.admin) {
      return sendError(res, 'Tidak terautentikasi.', 401);
    }
    return sendSuccess(res, { admin: req.admin });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
  getMe
};
