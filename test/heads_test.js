process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let pool = require('../config/config_test');
let token = require('../config/token');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000').keepOpen();

var row1 = {
    fio: 'Курлапов Юрий Петрович',
    position: 'Руководитель колледжа',
    addressStr: '141980 Московская область, г. Дубна, ул. Энтузиастов, д. 21',
    site: 'college.uni-dubna.ru',
    telephone: '8(49621) 6-61-51\n',
    email: '9165226038@mail.ru\n',
};

var row2 = {
    id: 0,
    fio: '123Курлапов Юрий Петрович',
    position: 'Руководитель колледжа',
    addressStr: '141980 Московская область, г. Дубна, ул. Энтузиастов, д. 21',
    site: 'college.uni-dubna.ru',
    telephone: '8(49621) 6-61-51\n',
    email: '9165226038@mail.ru\n',
};

var api1 = '/api/heads';
var api2 = '/api/admin/heads';

var tableName = 'heads';

var insertId = 0;

describe('heads', () => {
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
