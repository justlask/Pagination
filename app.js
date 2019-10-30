require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const path         = require('path');

mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// default value for title local
app.locals.title = 'MDlive Pagination';

app.use('/apps', require('./routes/api'));


module.exports = app;
