/**
 * Standard Success Response
 * @param {import('express').Response} res 
 * @param {any} data 
 * @param {string} [message] 
 * @param {number} [statusCode=200] 
 */
function sendSuccess(res, data = null, message = null, statusCode = 200) {
  const response = {
    success: true
  };
  if (data !== null) {
    response.data = data;
  }
  if (message) {
    response.message = message;
  }
  return res.status(statusCode).json(response);
}

/**
 * Standard Error Response
 * @param {import('express').Response} res 
 * @param {string} message 
 * @param {number} [statusCode=500] 
 * @param {any} [errors=null] 
 */
function sendError(res, message = 'Terjadi kesalahan pada server.', statusCode = 500, errors = null) {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
}

module.exports = {
  sendSuccess,
  sendError
};
