/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/heads', function(req, res, next) {
    apiHelper.findAll(res, 'heads');
});

/**
 * get all from common
 */
router.get('/teachingstaff', function(req, res, next) {
    apiHelper.findAll(res, 'teachingstaff');
});

module.exports = router;
