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

const app = express();


// default value for title local
app.locals.title = 'MDlive Pagination';

const index = require('./routes/index')
app.use('/', index)

const api = require('./routes/api')
app.use('/apps', api);


module.exports = app;
