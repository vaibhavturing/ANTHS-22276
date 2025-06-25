// src/config/database.js
const mongoose = require('mongoose');
const config = require('./config');

/**
 * Connect to MongoDB database
 * @returns {Promise<mongoose.Connection>} Mongoose connection object
 */
const connectDB = async () => {
  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB
    const connection = await mongoose.connect(config.database.url, options);
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
    return connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

/**
 * Disconnect from MongoDB database
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error(`Error disconnecting from MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  disconnectDB
};