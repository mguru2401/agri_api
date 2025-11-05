const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Ensure DB is connected (in serverless this runs on cold start)
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Route aliases without /api prefix (for convenience)
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/products', require('./routes/productRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'REST API with MongoDB',
    endpoints: {
      categories: ['/api/categories', '/categories'],
      products: ['/api/products', '/products']
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;


