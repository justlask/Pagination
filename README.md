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
  1. by
    required: id or name
  2. start
    optional
  3. end
    optional
  4. max
    page size
    if undefined default is 50
  5. order
    asc or desc
  6. page
    response has data, which holds the results from the query
    page, which is the current page, defaults to 1 if none selected
    total, which is the total amount of pages which contain data



  ## example queries
  ### apps/?by=id&max=50
  ### /apps/?by=id&start=2&end=40&max=30&order=asc
  ### /apps/?by=name&start=my-app-005&end=my-app-040&max=10&order=asc&page=3




# TODO:
• Bonus points: Automatic tests covering the endpoint "/apps".