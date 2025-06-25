// src/config/config.js
require('dotenv').config();

const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },

  // Cors configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

module.exports = config;