var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: String,
    product: String,
    quantity: Number,
    address: String,
    city: String,
    region: String,
    postalCode: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('order', orderSchema, 'order');

