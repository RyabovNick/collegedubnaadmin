process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let pool = require('../config/config_test');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

var user1 = {
    user: {
        username: 'test_user1',
        email: 'test1@mail.ru',
        password: 'password',
    },
};

var user2 = {
    user: {
        username: 'test_user2',
        password: 'password',
    },
};

var user3 = {
    user: {
        email: 'test3@mail.ru',
        password: 'password',
    },
};

var user4 = {
    user: {
        username: 'test_user4',
        email: 'test4@mail.ru',
    },
};

describe('Users', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query('Delete from `users`', function(error, result) {
                if (error) throw error;
                con.release();
                done();
            });
        });
    });

    describe('/POST new user2 without email', () => {
        it('it should not created new user', (done) => {
            requester
                .post('/api/users')
                .send(user2)
                .end((err, res) => {
                    res.body.errors['email or password'].should.be.eql('Не может быть пустым');
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    should.not.exist(res.body.affectedRows);
                    done();
                });
        });
    });

    describe('/POST new user3 without username', () => {
        it('it should not created new user', (done) => {
            requester
                .post('/api/users')
                .send(user2)
                .end((err, res) => {
                    res.body.errors['email or password'].should.be.eql('Не может быть пустым');
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    should.not.exist(res.body.affectedRows);
                    done();
                });
        });
    });

    describe('/POST new user4 without password', () => {
        it('it should not created new user', (done) => {
            requester
                .post('/api/users')
                .send(user3)
                .end((err, res) => {
                    res.body.errors['email or password'].should.be.eql('Не может быть пустым');
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    should.not.exist(res.body.affectedRows);
                    done();
                });
        });
    });

    describe('/POST new user1 true', () => {
        it('it should created new user', (done) => {
            requester
                .post('/api/users')
                .send(user1)
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
