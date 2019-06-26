const express = require('express');
const app = express();
const config = require('../config');
const bodyParser = require('body-parser');
const headerParser = require('header-parser');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jsonParser = bodyParser.json();
const jwtsecret = "mysecretkey";
const cors = require('cors')

app.use(cors())
app.use(jsonParser);
app.use(headerParser);

app.options('*', cors());

app.get('/', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
    if (err) throw err
    const db = client.db('test')
    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  })
});

app.post('/new-user', (req, res) => {
  const user = req.body;
  MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
    if (err) throw err
    const db = client.db('test')
    db.collection('users').find({ name: user.name }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length === 0) {

        db.collection('users').insertOne({ ...user, products: '[]' });
        return res.send({ message: 'server did add user' });
      }
      return res.status(400).send({ message: 'User exist already' })
    })
  })
});

app.get('/userProduct', (req, res) => {
  try {
    const decodedUser = jwt.verify(req.headers.token, jwtsecret);
    MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
      if (err) throw err
      const db = client.db('test')
      db.collection('users').find({ name: decodedUser.name }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        const product = result[0].products || [];
        return res.status(200).send(product);
      })
    })
  } catch (err) {
    res.status(401).send(err)
  }
});

app.get('/products', (req, res) => {
  try {
    MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
      if (err) throw err
      const db = client.db('test')
      db.collection('products').find().toArray(function (err, result) {
        if (err) throw err;
        const product = result || [];
        return res.status(200).send(product);
      })
    })
  } catch (err) {
    res.status(401).send(err)
  }
});

app.post('/setProduct', (req, res) => {
  try {
    const decodedUser = jwt.verify(req.headers.token, jwtsecret);
    console.log(decodedUser);
    let product;
    MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
      if (err) throw err
      const db = client.db('test')
      db.collection('products').find({ name: req.body.name }).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        product = result[0];
        if (!product) return res.status(401).send('be');
        db.collection('users').update({ name: decodedUser.name }, { $addToSet: { products: product } }).then(({ result }) => {
          res.status(200).send(result)
        })

      })
    })
  } catch (err) {
    console.log(err)
    res.status(401).send(err)
  }
});

app.post('/auth', (req, res) => {
  const user = req.body;
  console.log(user);
  MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
    if (err) throw err
    const db = client.db('test')
    db.collection('users').find({ name: user.name }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length > 0 && result[0].password === user.password) {
        const token = jwt.sign({ ...user }, jwtsecret);
        return res.send({ token });
      }
      return res.status(403).send({ message: `Invalid password or user don't exist` })
    })
  })
})

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));