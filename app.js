require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const path         = require('path');

mongoose
  .connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(x => {
    // console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));



const index = require('./routes/index')
app.use('/', index)

const api = require('./routes/api')
app.use('/apps', api);


module.exports = app;
