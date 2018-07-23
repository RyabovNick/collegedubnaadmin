/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/vacant', function(req, res, next) {
    apiHelper.findAll(res, 'vacant');
});

module.exports = router;
