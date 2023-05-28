const assert = require('assert');
const request = require('supertest');
const app = require('../app');

var requesting = request("http://localhost:3000")

describe('products', function() {
    describe('GET', function(){
        it('It should respond with a 200 status code', function(done){
            requesting.get('/')
                .expect(200, done);
        });
    });
});
