// src/config/database.js
const mongoose = require('mongoose');
const config = require('./config');

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url, config.database.options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB database
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error.message);
  }
};

module.exports = {
  connectDB,
  disconnectDB
};