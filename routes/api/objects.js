/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/purposecab', function(req, res, next) {
    apiHelper.findAll(res, 'purposecab');
});

/**
 * get all from common
 */
router.get('/purposelibr', function(req, res, next) {
    apiHelper.findAll(res, 'purposelibr');
});

/**
 * get all from common
 */
router.get('/purposeeios', function(req, res, next) {
    apiHelper.findAll(res, 'purposeeios');
});

module.exports = router;
