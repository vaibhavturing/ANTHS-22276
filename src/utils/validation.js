/**
 * Validation Utility for the Travel Booking Application
 * Uses Joi for schema validation with custom error messages
 */
const Joi = require('joi');

// Common validation patterns
const patterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  objectId: /^[0-9a-fA-F]{24}$/
};

// Custom error messages
const messages = {
  'string.empty': '{#label} cannot be empty',
  'string.min': '{#label} should have at least {#limit} characters',
  'string.max': '{#label} should have at most {#limit} characters',
  'string.email': 'Please provide a valid email address',
  'string.pattern.base': '{#label} fails to match the required pattern',
  'any.required': '{#label} is required',
  'object.unknown': 'Unknown field: {#label}'
};

// Password validation error messages
const passwordMessages = {
  'string.pattern.base': 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
};

// User validation schemas
const userSchemas = {
  // Registration validation schema
  register: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages(messages),
    
    password: Joi.string()
      .pattern(patterns.password)
      .required()
      .messages({ ...messages, ...passwordMessages }),
    
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages(messages),
    
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages(messages),

    // Optional fields
    phone: Joi.string()
      .optional()
      .messages(messages),
    
    dateOfBirth: Joi.date()
      .optional()
      .max('now')
      .messages({
        ...messages,
        'date.max': 'Date of birth cannot be in the future'
      })
  }).messages(messages),

  // Login validation schema
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages(messages),
    
    password: Joi.string()
      .required()
      .messages(messages)
  }).messages(messages)
};

module.exports = {
  userSchemas,
  patterns
};