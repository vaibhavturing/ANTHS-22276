/**
 * Main Router for the Travel Booking Application
 * This file serves as the central point for all API routes
 */
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Test route for the main router
router.get('/test', (req, res) => {
  res.status(200).json({ 
    message: 'Main router is working properly',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;