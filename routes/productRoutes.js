const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Create Product
router.post('/', async (req, res) => {
  try {
    const { category_id, name, price, image_url, description } = req.body;
    
    // Validate required fields
    if (!category_id || !name || price === undefined || !image_url || !description) {
      return res.status(400).json({ 
        error: 'All fields are required: category_id, name, price, image_url, description' 
      });
    }
    
    // Check if category exists
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Validate price is a number
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    const product = new Product({
      category_id,
      name,
      price,
      image_url,
      description
    });
    
    await product.save();
    
    // Populate category_id for response
    await product.populate('category_id', 'name');
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category_id', 'name')
      .sort({ createdAt: -1 });
    
    if (products.length === 0) {
      return res.json({ message: 'There is no data in products' });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category_id', 'name');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  try {
    const { category_id, name, price, image_url, description } = req.body;
    
    // Check if category_id is provided and exists
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }
    
    // Validate price if provided
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    const updateData = {};
    if (category_id) updateData.category_id = category_id;
    if (name) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (image_url) updateData.image_url = image_url;
    if (description) updateData.description = description;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category_id', 'name');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

