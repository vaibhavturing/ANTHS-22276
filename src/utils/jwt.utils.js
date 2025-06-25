// src/utils/jwt.utils.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object to encode in the token
 * @param {Object} options - Additional options for token generation
 * @returns {String} JWT token
 */
const generateToken = (user, options = {}) => {
  try {
    const payload = {
      id: user._id,
      email: user.email,
      // Include only necessary user data in the token
      // Avoid including sensitive information like passwords
    };

    // Default expiration to 24 hours if not specified
    const expiresIn = options.expiresIn || config.jwt.expiresIn || '24h';
    
    // Generate and return the JWT token
    return jwt.sign(payload, config.jwt.secret, { expiresIn });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

/**
 * Verify a JWT token and return the decoded data
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    // Handle different types of JWT errors
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      console.error('Error verifying JWT token:', error);
      throw new Error('Failed to authenticate token');
    }
  }
};

module.exports = {
  generateToken,
  verifyToken
};