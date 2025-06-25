// src/middleware/error-handler.middleware.js
/**
 * Global error handling middleware for Express
 * Catches all errors and returns structured JSON responses
 */
const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;
  
  console.error(`Error: ${message}`, err.stack);

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    // Mongoose validation errors
    statusCode = 400;
    const validationErrors = {};
    
    // Format validation errors
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        validationErrors[key] = err.errors[key].message;
      });
    }
    
    errors = validationErrors;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    // Mongoose cast errors (e.g. invalid ObjectId)
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    message = 'Duplicate entry found';
    
    // Extract the duplicate key field
    const field = Object.keys(err.keyValue)[0];
    errors = {
      [field]: `${field} already exists`
    };
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    // JWT errors
    statusCode = 401;
    message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
  } else if (err.name === 'SyntaxError' && err.message.includes('JSON')) {
    // JSON parsing errors
    statusCode = 400;
    message = 'Invalid JSON';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    errors,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
};

module.exports = errorHandler;