var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../schemas/user');

/* database */
router.post('/', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  mongoose
    .connect('mongodb://mongo/takishopdb')
    .then((db) => {
      const query = User.findOne({ email: email, password: password });
      query.exec((err, user) => {
        if (err) {
        } else {
          if (!user) {
            res.status(401).json({
              authenticated: false,
            });
          } else {
            res.status(200).json({
              name: user.name,
              email: user.email,
              authenticated: true,
            });
          }
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});
module.exports = router;
