# Local Set up
1. Git clone, npm install
2. You will need to create a .env in the root directory
3. Add the following to your newly created .env
    1. PORT=3000 (or whichever you choose)
    2. MONGO_URI= "your connection string" or 'mongodb://localhost/apps'
4. Seed your DB

      Navigate to the root folder and run `node bin/seeds.js` in the terminal to seed your database, it is set up to load 100 "apps", this can be changed by increasing the size of the number inside seedApps in the seeds file. 
            It is only set up to handle from 1 to 999 apps created this way


      <b>Note: Mocha tests are written for 100 apps</b>

eg: seedApps(100);

# Documentation for the API
#### API routes are located in routes/api.js
#### endpoint is /apps

# Query structure
  ## parameters
  1. <b>by</b><br>
    required: id or name
  2. <b>start</b><br>
    optional: id number or name
  3. <b>end</b><br>
    optional: id number or name
  4. <b>max</b><br>
    optional: the requested page size (if undefined default is 50)
  5. <b>order</b><br>
    optional: asc or desc
  6. <b>page</b><br>
    optional: defaults to first page on initial request, can be any page number up to the number in "total"



  ## example queries

[/apps](https://paginationmdlive.herokuapp.com/apps)<br>
[/apps/?by=id&max=50](https://paginationmdlive.herokuapp.com/apps/?by=id&max=50)<br>
[/apps/?by=id&start=2&end=40&max=30&order=asc](https://paginationmdlive.herokuapp.com/apps/?by=id&start=2&end=40&max=30&order=asc)<br>
[/apps/?by=name&start=my-app-005&end=my-app-040&max=10&order=asc&page=3](https://paginationmdlive.herokuapp.com/apps/?by=name&start=my-app-005&end=my-app-040&max=10&order=asc&page=3)

# Approach documentation
#### Planning
  I looked at this challenge, and thought that I would solve it in Ruby, using RoR. I spent a few hours learning basic Ruby syntax, but decided that I would initially solve the problem in the language that I am most comfortable with -- JavaScript.

#### Node.js + Express.js + Mongoose
  I created a new folder, and used npm init to create a new package.json. Looking at the requirements I saw that there were no libraries to be used in this process, so I kept it minimal, only installing 3 npm packages: express, dotenv, and mongoose. I then created a basic file structure to hold my seeds, set up routing, and handle my models and database connection.

#### Routing
  1. "by" is required, if by is undefined an error message is delivered stating that by is required and the only valid options are `id` or `name`
  2. if "by" is anything other than `id` or `name` an error message is delivered stating the same.
  3. if they enter a valid query:

      1. handle a case for max, setting default to 50 if undefined

      2. handle ascending/descending, if undefined using ascending

      3. handle page number, the number given or 1 if undefined

  4. handle starts and ends: 


      1. initialize an empty object `variables` which will then be passed into the find query if start/end are undefined. 
        
      2. a few cases to modify `variables` depending on start/end combinations.

  5. handle the search and pagination

      1. Find all documents that match the `variables` object using `.find()`
      2. set the max page size using `.limit()` and the max param, defaulting to 50
      3. use `.skip()` to handle the offset requirements (desired max * page number) - max
      4. use `.sort()` with the value `order` to determine ascending or descending - defaulting to ascending if unknown.
      5. before sending the json data back, I use `.countDocuments()` with the `variables` to see how many documents match the query, using that data I calculate how many pages of data there are. and return the data, the current page, and the total amount of pages.





# Bonus: Automatic tests covering the endpoint "/apps".

## Mocha / Chai
For testing of this app I am using mocha.
If you are running it locally, you may access the tests by running `npm test`


Tests will auto load when you hit the page (at '/') without accessing the api endpoint at /apps
If you are trying to load these tests in the browser locally, please change occurrences of ${liveURL} to ${localURL} in `public/api.js`