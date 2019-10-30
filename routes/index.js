const express = require('express');
const router  = express.Router();


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
  res.json('hello')
});

module.exports = router;
