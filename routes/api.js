const express = require('express');
const router  = express.Router();
const App = require('../models/App')
/* 
params: {
      "range": {
        "by": "id",
        "start": 10,
        "end": 50,
        "max": 5,
        "order": "asc"
} }


params: { "range": { "by": "name", "start": "my-app-001", "end": "my-app-050", "max": 10, "order": "asc" } }

by: required => id/name only permitted
start: optional => first in dataset
end: optional => if undefined return default max => if 
max: default = 50
order: asc or desc

• The key "by" is required and the only values permitted are "id" and "name".
• Both "start" and "end" identifiers can be omitted, in which case the start
identifier is assumed to be the first in the data set.
• Even if the "start" identifier is included, the "end" identifier can be omitted, in
which case the program queries with no ending bound, but will still return results
account for "max" page size.
• The "max" page size can be omitted, in which case the default of 50 is assumed.
• For cases where the "end" identifier extends beyond what can fit inside the
maximum page, the page sizes takes precedence.
• The behavior in other corner cases can be safely assumed to be undefined.

*/
router.get('/', (req, res, next) => {
  console.log(req.query)

  // cannot be undefined
  if (req.query.by === undefined ) res.status(400).json('by is not optional, values are: name or id')

  //must be "id" or "name"
  // handles name queries
  else if (req.query.by === "name") {

    let max, order, page
    (req.query.max === undefined) ? max = 50 : max = Number(req.query.max);
    (req.query.order === "asc") ? order = 1 : order = -1;
    page = Number(req.query.page) || 1;

    let variables = {}

    if (req.query.start && req.query.end) variables = {name: { $gte: req.query.start, $lte: req.query.end } }
    else if (req.query.start && !req.query.end) variables = {name: { $gte: req.query.start } }
    else if (!req.query.start && req.query.end) variables = {name: { $lte: req.query.end } }

    App.find(variables)
    .limit(max)
    .skip((max * page) - max)
    .sort({name: order})
    .then(data => {
      App.countDocuments(variables, function(err, count) {
        res.json({data: data, page: page, total: Math.ceil(count/max)})
    })
  })
}


  //handles id queries
  else if (req.query.by === "id") {

    let max, order, page
    (req.query.max === undefined) ? max = 50 : max = Number(req.query.max);
    (req.query.order === "desc") ? order = 1 : order = -1;
    page = Number(req.query.page) || 1;

    let variables = {}

    if (req.query.start && req.query.end) variables = {id: { $gte: req.query.start, $lte: req.query.end } }
    else if (req.query.start && !req.query.end) variables = {id: { $gte: req.query.start } }
    else if (!req.query.start && req.query.end) variables = {id: { $lte: req.query.end } }


    App.find(variables)
    .limit(max)
    .skip((max * page) - max)
    .sort({id: order})
    .then(data => {
      App.countDocuments(variables, function(err, count) {
        res.json({data: data, page: page, total: Math.ceil(count/max)})
      })
    })
  }

  else res.status(400).json()
});

module.exports = router;
