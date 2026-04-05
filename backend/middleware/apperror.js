
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Set to true for errors we anticipate

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;