const express = require('express');
const router  = express.Router();
const App = require('../models/App')


router.get('/', (req,res,next) => {
  res.render('index.html')
})

module.exports = router;
