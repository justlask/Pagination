# You will need a .env file to run locally
### please add to the .env you created in the root directory
1. PORT=3000 (or whichever you choose)
2. MONGO_URI= "your connection string"

# Seed Your DB
You can simply run <b>node bin/seeds.js</b> in terminal to seed your database, it is set up to load 100 "apps", this can be changed by increasing the size of the number inside seedApps in the seeds file. 

eg: seedApps(100);

# Doccumentation for the API
#### API routes are located in routes/api.js
#### endpoint is /apps

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


# Approach doccumentation
#### Planning
  I looked at this challenge, and thought that I would solve it in Ruby, using RoR. I spent a few hours learning basic Ruby syntax, but decided that I would initially solve the problem in the language that I am most comfortable with -- JavaScript.

#### Node.js + Express.js + Mongoose
  I created a new folder, and used npm init to create a new package.json. Looking at the requirements I saw that there were no libraries to be used in this process, so I kept it minimal, only installing 3 npm packages: express, dotenv, and mongoose. I then created a basic file structure to hold my seeds, set up routing, and handle my models and database connection.

#### Routing
  1. "by" is required, if by is undefined an error message is delivered stating that by is required and the only valid options are `id` or `name`
  2. if "by" is anything other than `id` or `name` an error message is delivered stating the same.
  3. if they enter a valid query:
    1. handle a case for max, setting default to 50 if undefined
    2. handle ascending/descending, if undefined using ascending
    3. handle page number, the number given or 1 if undefined
    4. handle starts and ends: 
        1. initalize an empty object `variables` which will then be passed into the find query if start/end are undefined. 
        2. a few cases to modify the query depending on start/end combinations.
    5. handle the search and pagination





# TODO:
• Bonus points: Automatic tests covering the endpoint "/apps".