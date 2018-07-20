process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let pool = require('../config/config_test');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

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

    var user = {
        user: {
            username: 'test_user',
            email: 'test@mail.ru',
            password: 'password',
        },
    };

    describe('/POST new user', () => {
        it('it should created new user', (done) => {
            requester
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.affectedRows.should.be.eql(1);
                    done();
                });
        });
    });
});

requester.close();
