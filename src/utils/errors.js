/**
 * Custom Error Classes for Travel Booking Application
 * Provides standardized error handling
 */

/**
 * Base API Error class
 * Used for all API-related errors
 */
class ApiError extends Error {
  /**
   * Create a new API Error
   * 
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {Object} data - Additional error data
   */
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = true; // Indicates if error is operational or programming

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error
 * Used for 404 errors
 */
class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Validation Error
 * Used for validation failures
 */
class ValidationError extends ApiError {
  constructor(message = 'Validation failed', data = null) {
    super(message, 400, data);
  }
}

/**
 * Unauthorized Error
 * Used for authentication failures
 */
class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Forbidden Error
 * Used for authorization failures
 */
class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError
};