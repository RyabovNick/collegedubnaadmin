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
    fio: 'Вихрова Галина Федоровна\n',
    position: 'преподаватель',
    teachingDescipline: 'психология',
    teachingLevel: 'высшее',
    teachingQual: 'психолог',
    degree: 'нет',
    academStat: 'нет',
    employeeQualification: 'подготовка специалистов среднего звена',
    profDevelopment: '72 часа',
    genExperience: '38',
    specExperience: '38',
};

var row2 = {
    id: 0,
    fio: '123Вихрова Галина Федоровна\n',
    position: 'преподаватель',
    teachingDescipline: 'психология',
    teachingLevel: 'высшее',
    teachingQual: 'психолог',
    degree: 'нет',
    academStat: 'нет',
    employeeQualification: 'подготовка специалистов среднего звена',
    profDevelopment: '72 часа',
    genExperience: '38',
    specExperience: '38',
};

var api1 = '/api/teachingstaff';
var api2 = '/api/admin/teachingstaff';

var tableName = 'teachingstaff';

var insertId = 0;

describe('teachingstaff', () => {
    before((done) => {
        //Before each test we empty the database
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query('Delete from ??', [tableName], function(error, result) {
                if (error) throw error;
                con.release();
                done();
            });
        });
    });

    describe('/GET all ' + tableName + ' rows', () => {
        it('it should show zero row', (done) => {
            requester.get(api1).end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    });

    describe('/POST new ' + tableName, () => {
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

    describe('/POST new ' + tableName, () => {
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

    describe('/PUT change ' + tableName + ' without token', () => {
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

    describe('/PUT change ' + tableName + ' with token', () => {
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

    describe('/Delete ' + tableName + ' without token', () => {
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

    describe('/Delete ' + tableName + ' with token', () => {
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
});

requester.close();
