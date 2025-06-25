// In your server.js or app.js file

// Import middlewares
const errorHandler = require('./middleware/error-handler.middleware');
const notFoundHandler = require('./middleware/not-found.middleware');

// ... other middleware and routes ...

// 404 handler - should be after all routes
app.use(notFoundHandler);

// Error handler - should be the last middleware
app.use(errorHandler);