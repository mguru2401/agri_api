const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create Category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const category = new Category({ name });
    await category.save();
    
    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    
    if (categories.length === 0) {
      return res.json({ message: 'There is no data in categories' });
    }
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Category
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

