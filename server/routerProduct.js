const express = require('express');
const routerProduct = express.Router();
const { User, Product } = require('./schemasModel');
const jwt = require('jsonwebtoken');
const jwtSecret = "ssh";

routerProduct.get('/', (req, res) => {
  res.send('hello world');
})

routerProduct.get('/products', async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limits || 10,
      select: 'name icon _id rating listVoters'
    }
    const products = await Product.paginate({}, options);
    res.send(products);
  } catch (err) {
    res.status(401).send(err)
  }
});

routerProduct.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    res.send(product);
  } catch (err) {
    res.status(401).send(err)
  }
});


routerProduct.post('/comment', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        name: req.body.name
      },
      {
        $addToSet:
        {
          comments:
          {
            author: req.body.author,
            body: req.body.body
          }
        }
      }, (err, doc) => console.log(doc));
    res.send(product);
  } catch (err) {
    res.status(401).send(err)
  }
});

routerProduct.post('/vote', async (req, res) => {
  try {
    const { _doc: decodedUser } = jwt.verify(req.headers.token, jwtSecret);
    let { rating, listVoters } = await Product.findOne({ name: req.body.name });
    if (!rating) rating = 0
    const newListVoters = listVoters.map((elem) => {
      if (elem.voter === decodedUser.name) {
        return {
          voter: decodedUser.name,
          vote: req.body.rating
        }
      }
      return elem;
    });
    if (!newListVoters.length) {
      newListVoters.push({
        voter: decodedUser.name,
        vote: req.body.rating
      });
    }
    await Product.updateOne(
      {
        name: req.body.name
      },
      {
        $set: {
          listVoters: newListVoters,
          rating: rating + (+req.body.rating)
        }
      });
    const product = await Product.findOne({ name: req.body.name });
    res.send(product);
  } catch (err) {
    res.status(401).send(err)
  }
});

module.exports = { routerProduct, jwtSecret };