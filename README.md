# Product CATALOG API

This is a simple Node.js and Express API for managing product categories and products.

## Features

- Create, read, update, and delete categories
- Create, read, update, and delete products
- Associate products with categories
- Retrieve products with category details

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Steps

```bash
# Clone the repository
git clone https://github.com/your-repo/product-catalog-api.git

# Navigate to the project directory
cd product-catalog-api

# Install dependencies
npm install

# Start the server
npm start
```

## API Endpoints

### Category Routes

#### Create a Category

**Endpoint:** `POST /api/categories`
**Description:** Creates a new category
**Request Body:**

```json
{
  "name": "Electronics"
}
```

**Response:**

```json
{
  "message": "Category created successfully",
  "category": {
    "_id": "60d5ec49e5294a2f5c9c9f30",
    "name": "Electronics"
  }
}
```

#### Get All Categories

**Endpoint:** `GET /api/categories`
**Response:**

```json
{
  "message": "Categories retrieved successfully",
  "categories": [
    {
      "_id": "60d5ec49e5294a2f5c9c9f30",
      "name": "Electronics"
    }
  ]
}
```

#### Get Category by ID

**Endpoint:** `GET /api/categories/:id`

#### Update Category

**Endpoint:** `PUT /api/categories/:id`
**Request Body:**

```json
{
  "name": "Updated Electronics"
}
```

#### Delete Category

**Endpoint:** `DELETE /api/categories/:id`

---

### Product Routes

#### Create a Product

**Endpoint:** `POST /api/products`
**Request Body:**

```json
{
  "name": "Smartphone",
  "description": "Latest model",
  "price": 699.99,
  "category": "60d5ec49e5294a2f5c9c9f30",
  "stock": 10,
  "variants": [{ "size": "6.5 inches", "color": "Black" }]
}
```

**Response:**

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "60d5f6e2e5294a2f5c9c9f33",
    "name": "Smartphone",
    "description": "Latest model",
    "price": 699.99,
    "category": "60d5ec49e5294a2f5c9c9f30",
    "stock": 10,
    "variants": [{ "size": "6.5 inches", "color": "Black" }],
    "discount": 0
  }
}
```

#### Get All Products

**Endpoint:** `GET /api/products`

#### Get Product by ID

**Endpoint:** `GET /api/products/:id`

#### Update Product

**Endpoint:** `PUT /api/products/:id`

#### Delete Product

**Endpoint:** `DELETE /api/products/:id`

## Models

### Category Model

```js
const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Category", CategorySchema);
```

### Product Model

```js
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
    variants: [{ size: String, color: String }],
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
```