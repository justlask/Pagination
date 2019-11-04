const express = require('express');
const router  = express.Router();
const App = require('../models/App')

router.get('/', (req, res, next) => {
  console.log(req.query)

  // cannot be undefined
  if (req.query.by === undefined ) res.status(400).json('by is not optional, values are: name or id')

  //must be "id" or "name"
  if (req.query.by === "name" || req.query.by === "id") {
    let type = req.query.by
    let max, order, page
    (req.query.max === undefined) ? max = 50 : max = Number(req.query.max);
    (req.query.order === "desc") ? order = -1 : order = 1;
    page = Number(req.query.page) || 1;

    let variables = {}
    if (req.query.start && req.query.end) variables[type] = { $gte: req.query.start, $lte: req.query.end }
    else if (req.query.start && !req.query.end) variables[type] = { $gte: req.query.start }
    else if (!req.query.start && req.query.end) variables[type] = { $lte: req.query.end }

    App.find(variables)
    .limit(max)
    .skip((max * page) - max)
    .sort({name: order})
    .then(data => {
      App.countDocuments(variables, function(err, count) {
        res.json({data: data, page: page, total: Math.ceil(count/max)})
    }).catch(err => res.json(err))
  })
}

  else res.status(400).json('err')
});

module.exports = router;
