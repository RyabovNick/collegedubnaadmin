/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

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
