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
  console.log(typeof(req.query.by))
  // cannot be undefined
  if (req.query.by === undefined ) res.status(400).json('by is not optional: values are name or id')




  //must be "id" or "name"
  else if (req.query.by === "name") {

    let max, end, start, order, page

    (req.query.max === undefined) ? max = 50 : max = Number(req.query.max)
    console.log(req.query.page)
    console.log(typeof req.query.page)
    page = Number(req.query.page) || 1

    if (req.query.start)
    if (req.query.end)
    (req.query.order === "asc") ? order = 1 : order = -1

    // let number = App.count({}, (err, count) => {return count})
  
    // console.log(count)
    App.find()
    .limit(max)
    .skip((max * page) - max)
    .sort({name: order})
    .then(data => {


      App.countDocuments({}, function(err, count) {
        if (err) { return handleError(err) } //handle possible errors
        res.json({data: data, page: page, total: Math.floor(count/max)})
        //and do some other fancy stuff
    })
    // App.find().limit(req.params.max).then(data => res.json(data))
  })
}



  else if (req.query.by === "id") {
    let max, end, start, order, page

    (req.query.page === undefined) ? page = 1 : page = req.query.page
    (req.query.max === undefined) ? max = 50 : max = Number(req.query.max)


    // if (req.query.start)
    // if (req.query.end)


    
    (req.query.order === "asc") ? order = 1 : order = -1

    App.find()
    .limit(max)
    .sort({id: order})
    .then(data => res.json({data: data, page: page}))
    // App.find().limit(req.params.max).then(data => res.json(data))
  }

  else res.status(400).json('nope, thats messed up')

});

module.exports = router;
