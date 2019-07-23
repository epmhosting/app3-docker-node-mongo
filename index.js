const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: false
}));

var dbConnected = false;


// Connect to MongoDB
function connectDB() {
  console.log('connecting to mongodb...')
  mongoose
    .connect(
      'mongodb://mongo:27017/docker-node-mongo', {
        useNewUrlParser: true
      }
    )
    .then(() => {
      dbConnected = true;
      console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));
}

setTimeout(() => {
  console.log('Connect to MongoDB.');
  connectDB();
}, 10000);

const Item = require('./models/Item');

app.get('/', (req, res) => {
  if (!dbConnected) {
    connectDB()
  }

  if (dbConnected) {
    Item.find()
      .then(items => res.render('index', {
        items
      }))
      .catch(err => res.status(404).json({
        msg: 'No items found'
      }));
  } else {
    res.status(500).json({
      msg: 'Database not ready.'
    })
  }

});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log(`Server running...on port ${port}`));