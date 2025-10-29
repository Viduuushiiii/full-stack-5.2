const mongoose = require('mongoose');

// Define the variant subdocument schema
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
});

// Define the product schema with nested variants
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  variants: [variantSchema]  // Nested array of documents
});

module.exports = mongoose.model('Product', productSchema);
