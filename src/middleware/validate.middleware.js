/**
 * Input Validation Middleware
 * Uses Joi schemas to validate request data
 */
const { ApiError } = require('../utils/errors');

/**
 * Middleware factory function that returns a validation middleware
 * for the specified schema
 * 
 * @param {Object} schema - Joi schema to validate against
 * @param {String} property - Request property to validate (body, query, params)
 * @returns {Function} Express middleware function
 */
const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }

    const dataToValidate = req[property];
    const options = {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      stripUnknown: false // Don't remove unknown props
    };

    const { error, value } = schema.validate(dataToValidate, options);
    
    if (error) {
      // Format validation errors
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      // Return 400 Bad Request with validation errors
      return next(new ApiError(errorMessage, 400));
    }

    // Validation passed, replace req[property] with validated data
    req[property] = value;
    next();
  };
};

module.exports = validateRequest;