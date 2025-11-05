# REST API with MongoDB

A RESTful API built with Node.js, Express, and MongoDB for managing Categories and Products.

## Features

- **Category CRUD Operations**: Create, Read, Update, Delete categories
- **Product CRUD Operations**: Create, Read, Update, Delete products with category reference
- MongoDB integration with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - The `.env` file is already configured with your MongoDB connection string
   - Update if needed

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Categories

- **POST** `/api/categories` - Create a new category
  - Body: `{ "name": "Category Name" }`

- **GET** `/api/categories` - Get all categories

- **GET** `/api/categories/:id` - Get category by ID

- **PUT** `/api/categories/:id` - Update category
  - Body: `{ "name": "Updated Category Name" }`

- **DELETE** `/api/categories/:id` - Delete category

### Products

- **POST** `/api/products` - Create a new product
  - Body: 
    ```json
    {
      "category_id": "category_id_here",
      "name": "Product Name",
      "price": 99.99,
      "image_url": "https://example.com/image.jpg",
      "description": "Product description"
    }
    ```

- **GET** `/api/products` - Get all products (with populated category)

- **GET** `/api/products/:id` - Get product by ID (with populated category)

- **PUT** `/api/products/:id` - Update product
  - Body: (all fields optional)
    ```json
    {
      "category_id": "category_id_here",
      "name": "Updated Product Name",
      "price": 149.99,
      "image_url": "https://example.com/new-image.jpg",
      "description": "Updated description"
    }
    ```

- **DELETE** `/api/products/:id` - Delete product

## Example Requests

### Create Category
```bash
POST http://localhost:3000/api/categories
Content-Type: application/json

{
  "name": "Electronics"
}
```

### Create Product
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "category_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Laptop",
  "price": 999.99,
  "image_url": "https://example.com/laptop.jpg",
  "description": "High-performance laptop"
}
```

## Server

The server runs on `http://localhost:3000` by default (configurable via PORT in .env file).




