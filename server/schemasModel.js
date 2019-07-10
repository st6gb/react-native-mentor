const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  name: String,
  icon: String,
  description: String,
  rating: Number,
  listVoters: [
    {
      voter: String,
      vote: String,
    }
  ],
  comments: [
    {
      author: String,
      body: String
    }
  ]
})

productSchema.plugin(mongoosePaginate);

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