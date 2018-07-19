process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let pool = require('../config/config_test');

chai.use(chaihttp);

describe('Users', () => {
    setTimeout(function() {
        beforeEach((done) => {
            //Before each test we empty the database
            pool.getConnection(function(err, con) {
                if (err) throw err;
                con.query('Delete from `users`', function(error, result) {
                    if (error) throw error;
                    con.release();
                });
            });
        });
    }, 10000);

    describe('/POST new user', () => {
        it('it should created new user', (done) => {
            chai.request(app)
                .post('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});
