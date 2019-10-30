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

# Query structure
  ## apps/?by=id&max=50
  1. by
  2.
  3.
  4.


by: required => id/name only permitted
start: optional => first in dataset
end: optional => if undefined return default max => if 
max: default = 50
order: asc or desc




# TODO:
• Bonus points: Automatic tests covering the endpoint "/apps".