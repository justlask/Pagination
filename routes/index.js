const express = require('express');
const router  = express.Router();
const App = require('../models/App')


/* GET home page */



/* 
params: {
      "range": {
        "by": "id",
        "start": 10,
        "end": 50,
        "max": 5,
        "order": "asc"
} }

*/
router.get('/', (req, res, next) => {
  App.find().then(data => res.json(data))
});

module.exports = router;
