const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/productModel');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection failed:', err));

// ✅ Insert Sample Products (Run Once)
app.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      {
        name: "T-Shirt",
        price: 499,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 50 },
          { color: "Blue", size: "L", stock: 30 }
        ]
      },
      {
        name: "Sneakers",
        price: 1999,
        category: "Footwear",
        variants: [
          { color: "White", size: "9", stock: 20 },
          { color: "Black", size: "10", stock: 15 }
        ]
      },
      {
        name: "Smartwatch",
        price: 4999,
        category: "Electronics",
        variants: [
          { color: "Silver", size: "Standard", stock: 10 },
          { color: "Black", size: "Standard", stock: 5 }
        ]
      }
    ];

    await Product.insertMany(products);
    res.status(200).json({ message: 'Sample products inserted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Retrieve all products
app.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Filter by category
app.get('/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Project only variant details (color, size)
app.get('/products/variants', async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, variants: 1, _id: 0 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
