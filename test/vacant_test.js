process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const pool = require('../config/config');
const token = require('../config/token');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

var row1 = {
    code: '15.15.15',
    name: 'Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)',
    level: 'Среднее профессиональное образование',
    course: '1',
    form: 'Очная',
    numberBFVacant: '0',
    numberBRVacant: '0',
    numberBMVacant: '0',
    numberPVacant: '1',
};

var row2 = {
    id: 0,
    code: '17.17.17',
    name: 'Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)',
    level: 'Среднее профессиональное образование',
    course: '1',
    form: 'Очная',
    numberBFVacant: '0',
    numberBRVacant: '0',
    numberBMVacant: '0',
    numberPVacant: '1',
};

var api1 = '/api/vacant';
var api2 = '/api/admin/vacant';

var insertId = 0;

describe('Vacant', () => {
    before((done) => {
        //Before each test we empty the database
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query('Delete from `vacant`', function(error, result) {
                if (error) throw error;
                con.release();
                done();
            });
        });
    });

    describe('/GET all vacant rows', () => {
        it('it should show zero row', (done) => {
            requester.get(api1).end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    });

    describe('/POST new vacant', () => {
        it('it should be unauthorized', (done) => {
            requester
                .post(api2)
                .send(row1)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/POST new vacant', () => {
        it('it should be authorized and insert row', (done) => {
            requester
                .post(api2)
                .set('Authorization', 'Token ' + token)
                .send(row1)
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body.insertId);
                    insertId = res.body.insertId;
                    row2['id'] = insertId;
                    done();
                });
        });
    });

    describe('/PUT change vacant without token', () => {
        it('it should be unauthorized', (done) => {
            requester
                .put(api2)
                .send(row2)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/PUT change vacant with token', () => {
        it('it should be authorized and changed row', (done) => {
            requester
                .put(api2)
                .set('Authorization', 'Token ' + token)
                .send(row2)
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body.affectedRows);
                    res.body.affectedRows.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/Delete vacant without token', () => {
        it('it should be unauthorized', (done) => {
            requester
                .delete(api2)
                .send(row2)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/Delete vacant with token', () => {
        it('it should be authorized and delete row', (done) => {
            requester
                .delete(api2)
                .set('Authorization', 'Token ' + token)
                .send(row2)
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body.affectedRows);
                    res.body.affectedRows.should.be.eql(1);
                    done();
                });
        });
    });

    /*
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
    });*/
});

requester.close();
