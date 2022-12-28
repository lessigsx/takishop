var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema, 'user');
