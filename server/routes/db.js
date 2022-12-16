var express = require('express');
var router = express.Router();
const dbConnect = require('../db/conn');

async function newUser(userData) {
  // data layout:
  // name, email, password, balance, then created_at
  const collection = db.collection('users');
  await collection.insertOne({
    name: userData["name"],
    email: userData["email"],
    password: userData["password"],
    balance: 100, // por ahora todos tendrán 50 mil a gastar
    created_at: new Date(),
  });
  res.render('result');
}

/* database */
router.get('/', async function (req, res, next) {
  //var type = req.body.type;
  //colecciones: products, users (balance etc), orders

  var client = await dbConnect.connectToCluster();
  const db = client.db('playground');
});

module.exports = router;
