// src/middleware/not-found.middleware.js
const ApiError = require('../utils/api-error');

/**
 * Middleware for handling 404 Not Found errors
 * This should be placed after all other routes
 */
const notFoundHandler = (req, res, next) => {
  // Create a new error with 404 status code
  const error = new ApiError(`Route not found - ${req.originalUrl}`, 404);
  next(error);
};

module.exports = notFoundHandler;