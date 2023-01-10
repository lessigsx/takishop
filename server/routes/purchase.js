var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../schemas/order');

/* database */
router.post('/', function (req, res, next) {
  const data = req.body.formData;
  mongoose
    .connect('mongodb://mongo/takishopdb')
    .then((db) => {
      const newOrder = new Order(data);

      newOrder.save((err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(503);
        } else {
          return res.sendStatus(200);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});
module.exports = router;
