// src/server.js (modified)
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');
require('dotenv').config();

// Initialize Express application
const app = express();

// Set port number
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Basic route for API testing
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

module.exports = app;