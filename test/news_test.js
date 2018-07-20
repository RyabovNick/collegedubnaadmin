process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let pool = require('../config/config_test');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

describe('News', () => {
    describe('/Get news', () => {
        it('it should return news', (done) => {
            requester.get('/api/news').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(142);
                done();
            });
        });
    });
});

requester.close();
