process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const pool = require('../config/config');
const token = require('../config/token');

global.app = app;
global.expect = chai.expect;
global.requester = supertest(app);
global.pool = pool;
global.token = token;
global.should = chai.should();
global.chaihttp = chaihttp;
