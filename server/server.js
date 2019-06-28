const express = require('express');
const app = express();
const config = require('../config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const headerParser = require('header-parser');
const jwt = require('jsonwebtoken');
const jsonParser = bodyParser.json();
const jwtsecret = "ssh";
const cors = require('cors');
const { User, Product } = require('./schemasModel');

app.use(cors())
app.use(jsonParser);
app.use(headerParser);
app.options('*', cors());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

app.post('/new-user', async (req, res) => {
  try {
    const reqUser = req.body;
    const user = await User.findOne({ name: reqUser.name }).exec();
    if (user) {
      res.status(400).send({ message: 'User exist already' });
      return;
    }
    const newUser = new User({ ...reqUser, product: [] });
    const result = await newUser.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/userProduct', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtsecret);
    const user = await User.findOne({ name: decodedUser.name });
    const product = user.products || [];
    res.send(product);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.send(products);
  } catch (err) {
    res.status(401).send(err)
  }
});

app.post('/setProduct', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtsecret);
    const product = await Product.findOne({ name: req.body.name }).exec();
    const result = await User.update({ name: decodedUser.name }, { $addToSet: { products: product } });
    res.send(result);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.post('/auth', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name }).exec();
    if (user.password === req.body.password) {
      const token = jwt.sign({ ...user }, jwtsecret);
      res.send({ token });
      return;
    }
    res.status(403).send({ message: `Invalid password or user don't exist` })
  } catch (err) {
    res.status(500).send(err);
  }
})


app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));