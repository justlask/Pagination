let App = require('../models/App')
let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should;
let expect = chai.expect;


chai.use(chaiHttp);

// endpoint without params
describe('/app without params', () => {

  it('should fail fail with a status 400', function(done) { // <= Pass in done callback
    chai.request(server)
    .get('/apps')
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should respond with message "by is not optional, values are: name or id"', function(done) { // <= Pass in done callback
    chai.request(server)
    .get('/apps')
    .end(function(err, res) {
      expect(res.body).to.equal("by is not optional, values are: name or id")
      done();
    });
  });

});


// endpoint with incorrect by= params
describe('test to ensure by= is required to be id or name only', () => {

  it('should fail fail with a status 400', function(done) { // <= Pass in done callback
    chai.request(server)
    .get('/apps/?by=george')
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should respond with message "please check the documentation, you have entered an invalid query: by must be: id or name"', function(done) { // <= Pass in done callback
    chai.request(server)
    .get('/apps/?by=george')
    .end(function(err, res) {
      expect(res.body).to.equal("please check the documentation, you have entered an invalid query: by must be: id or name")
      done();
    });
  });

});


//app with by param name
describe('tests for by=name', () => {

  it('should respond with a status of 200', function(done) {
      chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
      chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with "my-app-001", and end with "my-app-050" for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].name).to.equal('my-app-001')
      expect(res.body.data[49].name).to.equal('my-app-050')
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});


//app with by param id
describe('tests for by=id', () => {

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=id')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
        chai.request(server)
    .get('/apps/?by=id')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with 1, and end with 50 for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=id')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].id).to.equal(1)
      expect(res.body.data[49].id).to.equal(50)
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=id')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=id')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});


//start tests for string
describe('tests for start=my-app-005', () => {

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=name&start=my-app-005')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
        chai.request(server)
    .get('/apps/?by=name&start=my-app-005')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with "my-app-005, and end with "my-app-054" for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=name&start=my-app-005')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].name).to.equal('my-app-005')
      expect(res.body.data[49].name).to.equal('my-app-054')
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=name&start=my-app-005')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=name&start=my-app-005')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});



//tests for start = number
describe('tests for start=40', () => {

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=40')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=40')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with #40, and end with #89 for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=40')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].id).to.equal(40)
      expect(res.body.data[49].id).to.equal(89)
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=40')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=40')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});



//end
describe('tests for end=my-app-040', () => {


  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=name&end=my-app-040')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 40', function(done) {
        chai.request(server)
    .get('/apps/?by=name&end=my-app-040')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(40);
      done();
    });
  });
  it('should respond with 40 apps in order starting with my-app-001, and end with my-app-040 for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=name&end=my-app-040')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(40);
      expect(res.body.data[0].name).to.equal('my-app-001')
      expect(res.body.data[39].name).to.equal('my-app-040')
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=name&end=my-app-040')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 1', function(done) {
        chai.request(server)
    .get('/apps/?by=name&end=my-app-040')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(1);
      done();
    });
  });
});


//start & end
describe('tests for start=1&end=5', () => {


  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=1&end=5')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 5', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=1&end=5')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(5);
      done();
    });
  });
  it('should respond with 5 apps in order starting with 1, and end with 5 for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=1&end=5')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(5);
      expect(res.body.data[0].id).to.equal(1)
      expect(res.body.data[4].id).to.equal(5)
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=1&end=5')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 1', function(done) {
        chai.request(server)
    .get('/apps/?by=id&start=1&end=5')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(1);
      done();
    });
  });
});


//max 
describe('tests for max=10', () => {

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=id&max=10')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 10', function(done) {
        chai.request(server)
    .get('/apps/?by=id&max=10')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(10);
      done();
    });
  });
  it('should respond with 10 apps in order starting with 1, and end with 10 for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=id&max=10')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(10);
      expect(res.body.data[0].id).to.equal(1)
      expect(res.body.data[9].id).to.equal(10)
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=id&max=10')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 10', function(done) {
        chai.request(server)
    .get('/apps/?by=id&max=10')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(10);
      done();
    });
  });
});


//order
describe('tests for order=asc or order=desc', () => {

  it('/apps/?by=name should return 50 apps in ascending order', function(done) {
        chai.request(server)
    .get('/apps/?by=name')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.page).to.equal(1);
      expect(res.body.totalPages).to.equal(2);
      expect(res.body.data[0].name).to.equal('my-app-001')
      expect(res.body.data[49].name).to.equal('my-app-050')
      done();
    });
  });

  it('/apps/?by=name&order=asc should return 50 apps in ascending order', function(done) {
        chai.request(server)
    .get('/apps/?by=name&order=asc')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.page).to.equal(1);
      expect(res.body.totalPages).to.equal(2);
      expect(res.body.data[0].id).to.equal(1)
      expect(res.body.data[49].id).to.equal(50)
      done();
    });
  });

  it('/apps/?by=name&order=desc should return 50 apps in descending order', function(done) {
        chai.request(server)
    .get('/apps/?by=name&order=desc')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.page).to.equal(1);
      expect(res.body.totalPages).to.equal(2);
      expect(res.body.data[0].name).to.equal('my-app-100')
      expect(res.body.data[49].name).to.equal('my-app-051')
      done();
    });
  });


});

//tests for page
describe('tests for page=1', () => {
  //should be able to paginate by changing page=

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with "my-app-001, and end with "my-app-050" for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].name).to.equal('my-app-001')
      expect(res.body.data[49].name).to.equal('my-app-050')
      done();
    });
  });
  it('should respond with body.page of 1', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res.body.page).to.equal(1);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});



//tests for page
describe('tests for page=2', () => {
  //should be able to paginate by changing page=

  it('should respond with a status of 200', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should respond with body.data as an array with a length of 50', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=2')
    .end(function(err, res) {
      expect(res.body.data).to.be.a('array');
      expect(res.body.data).to.have.lengthOf(50);
      done();
    });
  });
  it('should respond with 50 apps in order starting with "my-app-051, and end with "my-app-100" for the first page', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=2')
    .end(function(err, res) {
      expect(res.body.data).to.have.lengthOf(50);
      expect(res.body.data[0].name).to.equal('my-app-051')
      expect(res.body.data[49].name).to.equal('my-app-100')
      done();
    });
  });
  it('should respond with body.page of 2', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=2')
    .end(function(err, res) {
      expect(res.body.page).to.equal(2);
      done();
    });
  });
  it('should respond with body.totalPages to equal 2', function(done) {
        chai.request(server)
    .get('/apps/?by=name&page=1')
    .end(function(err, res) {
      expect(res.body.totalPages).to.equal(2);
      done();
    });
  });
});



