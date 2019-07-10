const express = require('express');
const app = express();
const config = require('../config');
const { routerProduct, jwtSecret } = require('./routerProduct');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const headerParser = require('header-parser');
const jwt = require('jsonwebtoken');
const jsonParser = bodyParser.json();

const fetch = require('node-fetch');
const { User, Product } = require('./schemasModel');
const adminToken = 'Bearer MTpYTl9hYV9iQlJZQ0gwVmJ6SlI2QmR3OkhPZ0lDM1NYRXNzQUxqNWZZRGt6cS02WFVwRmFxTVRxem5mMjB1VWZDWnM';

app.use(jsonParser);
app.use(headerParser);

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

app.use('/api', routerProduct);

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
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtSecret);
    const user = await User.findOne({ name: decodedUser.name });
    const product = user.products || [];
    res.send(product);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.delete('/products', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtSecret);
    const product = await Product.findOne({ name: req.body.name }).exec();
    await User.update({ name: decodedUser.name }, { $pull: { products: product } });
    const user = await User.findOne({ name: decodedUser.name });
    const userProduct = user.products || [];
    res.send(userProduct);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/setProduct', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtSecret);
    const product = await Product.findOne({ name: req.body.name }).exec();
    const result = await User.update({ name: decodedUser.name }, { $addToSet: { products: product } });
    res.send(result);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.get('/executeOrder', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtSecret);
    const tags = JSON.parse(req.headers.tags);
    const result = await User.update({ name: decodedUser.name }, { $set: { products: [] } });
    res.send(result);
    if (result.nModified) {
      fetch("https://go.urbanairship.com/api/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.urbanairship+json; version=3",
          Authorization: adminToken
        },
        body: JSON.stringify({
          audience: { tag: tags[0] },
          notification: {
            alert: "Ваш товар будет в скором временем доставлен"
          },
          device_types: ["android"]
        })
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/auth', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name }).exec();
    if (user.password === req.body.password) {
      const token = jwt.sign({ ...user }, jwtSecret);
      res.send({ token });
      return;
    }
    res.status(403).send({ message: `Invalid password or user don't exist` })
  } catch (err) {
    res.status(500).send(err);
  }
})


app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));