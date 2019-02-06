/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/eduStandarts', function(req, res, next) {
    apiHelper.findAll(res, 'edustandartdoc');
});

module.exports = router;
