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
  if (req.query.by === undefined ) res.json('need a type, name or id')
  if (req.query.by === "id" || req.query.by === "name") {
    res.json(req.query)
  }
  else res.json('nope, thats messed up')
  App.find().limit(req.params.max).then(data => res.json(data))
});

module.exports = router;
