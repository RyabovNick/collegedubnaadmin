let row1 = {
    name: 'Дата создания образовательной организации',
    tag: 'regDate',
    value: '13.04.1983',
};

let row2 = {
    id: 0,
    name: 'Дата создания образовательной организации',
    tag: 'regDate',
    value: '13.04.1983',
};

let api1 = '/api/common';
let api2 = '/api/admin/common';

let tableName = 'common';

let insertId = 0;

describe('testing system', () => {
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

    describe('/GET all ' + tableName + ' rows', () => {
        it('it should have one row', (done) => {
            requester.get(api1).end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.lengthOf(1);
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

    describe('/GET all ' + tableName + ' rows', () => {
        it('it should show zero row', (done) => {
            requester.get(api1).end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    });
});
