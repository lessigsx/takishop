var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    price: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('product', productSchema, 'product');
