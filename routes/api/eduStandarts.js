/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/eduStandarts', function(req, res, next) {
    apiHelper.findAll(res, 'edustandartdoc');
});

module.exports = router;
