var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../schemas/order');

/* database */
router.post('/', function (req, res) {
  const id = req.body.id;
  let response = [];

  mongoose
    .connect('mongodb://mongo/takishopdb')
    .then(async (db) => {
      Order.find({ id: id }).then((result) => {
        result.map((log) => {
          /*           console.log(res['product']);
          console.log(res['quantity']);
          console.log(res['address']);
          console.log(res['createdAt']); */
          response.push({
            product: log.product,
            quantity: log.quantity,
            address: log.address,
            purchaseTime: log.createdAt,
          });
        });
        try {
          res.send(response);
        } catch (err) {
          console.log(err);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});
module.exports = router;
