process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const pool = require('../config/config');
const token = require('../config/token');

chai.use(chaihttp);

var requester = chai.request('http://localhost:3000/api').keepOpen();

const common = '/common';
//education
const eduaccred = '/eduaccred';
const priem = '/priem';
const perevod = '/perevod';
const eduop = '/eduop';
const chislen = '/chislen';
//eduStandarts
const eduStandarts = '/eduStandarts';
//employees
const heads = '/heads';
const teachingstaff = '/teachingstaff';
//grants
const graduatejob = '/graduatejob';
const hostelinfo = '/hostelinfo';
const grantsdocs = '/grantsdocs';
//vacant
const vacant = '/vacant';
//objects
const purposecab = '/purposecab';
const purposelibr = '/purposelibr';
const purposeeios = '/purposeeios';
//news
const news = '/news';
const news_id = '/news/298';
const news_id_photo = '/news/298/photo';
const news_id_docs = '/news/298/docs';
const news_page = '/news/page/1';
//pages
const pages_id = '/pages/1';

describe('test all get api', () => {
    describe('/GET all common rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(common).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all eduaccred rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(eduaccred).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all priem rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(priem).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all perevod rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(perevod).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all eduop rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(eduop).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all chislen rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(chislen).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all eduStandarts rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(eduStandarts).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all heads rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(heads).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all teachingstaff rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(teachingstaff).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all graduatejob rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(graduatejob).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all hostelinfo rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(hostelinfo).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all grantsdocs rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(grantsdocs).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all vacant rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(vacant).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all purposecab rows', () => {
        it('it should completed with status 204 status no content', (done) => {
            requester.get(purposecab).end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    });

    describe('/GET all purposelibr rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(purposelibr).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all purposeeios rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(purposeeios).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all news rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(news).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all news_id rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(news_id).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all news_id_photo rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(news_id_photo).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all news_id_docs rows', () => {
        it('it should completed with status 204', (done) => {
            requester.get(news_id_docs).end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    });

    describe('/GET all news_page rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(news_page).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET all pages_id rows', () => {
        it('it should completed with status 200', (done) => {
            requester.get(pages_id).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});

requester.close();
