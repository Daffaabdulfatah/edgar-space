const multer = require('multer');
const { sendError } = require('../utils/response');

/**
 * Centralized Error Handler Middleware
 */
function errorMiddleware(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('[SERVER ERROR]:', err);

  // Multer Errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, 'Ukuran file terlalu besar. Maksimal ukuran gambar adalah 5 MB.', 400);
    }
    return sendError(res, `Gagal mengunggah file: ${err.message}`, 400);
  }

  // Custom upload filter error
  if (err.message && err.message.includes('Format file tidak didukung')) {
    return sendError(res, err.message, 400);
  }

  // Prisma Errors
  if (err.code === 'P2002') {
    const fields = err.meta && err.meta.target ? err.meta.target.join(', ') : 'field';
    return sendError(res, `Data pada ${fields} sudah digunakan. Silakan gunakan nilai lain.`, 409);
  }

  if (err.code === 'P2003') {
    return sendError(res, 'Operasi gagal karena relasi data terkait tidak valid.', 400);
  }

  if (err.code === 'P2025') {
    return sendError(res, 'Data yang diminta tidak ditemukan.', 404);
  }

  // Fallback
  const message = err.message || 'Terjadi kesalahan pada server. Silakan coba lagi.';
  const statusCode = err.statusCode || 500;
  return sendError(res, message, statusCode);
}

module.exports = errorMiddleware;
