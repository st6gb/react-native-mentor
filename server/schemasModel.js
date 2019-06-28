const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  icon: String,
  description: String,
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  products: [productSchema],
})

const Product = mongoose.model('product', productSchema);
const User = mongoose.model('user', userSchema);

module.exports = {
  Product,
  User
}