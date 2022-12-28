var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../schemas/user');

/* database */
router.post('/', function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  mongoose
    .connect('mongodb://mongo/takishopdb')
    .then((db) => {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });

      newUser.save((err) => {
        if (err) {
          console.error(err)
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
