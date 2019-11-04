# First Solution in JavaScript using node.js, express.js and mongoose
<p>Once compleated I will attempt to do the same in Ruby.</p>

# You will need a .env file to run locally
1. PORT=3000 (or whichever you choose)
2. MONGO_URI= "your connection string"

# Seed Your DB
<p>You can simply run node bin/seeds.js in terminal to seed your database, it is set up to load 100 "apps", this can be changed by increasing the size of the number inside seedApps in the seeds file. 

eg: seedApps(100);
</p>

# API routes are located in routes/api.js
# Doccumentation for the api


endpoint is /apps

by: required => id/name only permitted
start: optional => first in dataset
end: optional => if undefined return default max => if 
max: default = 50
order: asc or desc

# Query structure
  ## paramaters
  1. <b>by</b><br>
    required: id or name
  2. <b>start</b><br>
    optional: id number or name
  3. <b>end</b><br>
    optional: id number or name
  4. <b>max</b><br>
    optional: the requested page size (if undefined default is 50)
  5. <b>order</b><br>
    optional: asc or desc
  6. <b>page</b><br>
    optional: defaults to first page on intial request, can be any page number up to the number in "total"



  ## example queries
  ### apps/?by=id&max=50
  ### /apps/?by=id&start=2&end=40&max=30&order=asc
  ### /apps/?by=name&start=my-app-005&end=my-app-040&max=10&order=asc&page=3




# TODO:
• Bonus points: Automatic tests covering the endpoint "/apps".