//import 'babel-polyfill'
const assert = require('chai').assert;
const request = require('request');
const app = require('../test')
const chai = require('chai');
const chaiHttp = require('chai-http');
const baseUrl = '/iTracker';
const should = chai.should();
const api = require('../ap1.js')
chai.use(chaiHttp);
url = '/iTracker';
describe('Return codes', function() {
    this.timeout('15000');
    it('should get all users', (done) =>{
        chai.request(api).get('/users/').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();

        })
    });
    it('should get all request of a user', (done) =>{
        chai.request(api).get('/users/:id/requests').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        })
    })
    it('should get a request of a user', (done) =>{
        chai.request(api).get('/users/requests/:id').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        });
    });
    it('should create a request', (done) =>{
        chai.request(api).post('/users/requests/').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //res.should(res.body).be.a('array');
            done();
        });
    })
    it('should modify a request', (done) =>{
        chai.request(api).put('/users/requests/:id').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // res.should(res.body).be.a('array');
            done();
        })
    })
})


/*
describe("Return Codes", function(){
    it("return code", function(done){
        request.get({url: baseUrl},(err,res,body) =>{
           // expect(res.statusCode).to.equal(200);
            console.log(JSON.parse(body));
            done();
        });
    });
});

/*
describe('App',function(){
    it('app should return hello', function(){
        assert.equal(app.sayHello(),'hello');
    })
})*/