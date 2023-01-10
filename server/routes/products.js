var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../schemas/product');

/* database */
router.get('/', function (req, res) {
  mongoose
    .connect('mongodb://mongo/takishopdb')
    .then(async (db) => {
      const all = await Product.find();
      res.json(all);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});
module.exports = router;
