process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const pool = require('../config/config');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

describe('News', () => {
    describe('/Get news', () => {
        it('it should return news', (done) => {
            requester.get('/api/news').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(143);
                done();
            });
        });
    });
});

requester.close();
