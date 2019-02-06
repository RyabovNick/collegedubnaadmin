/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/vacant', function(req, res, next) {
    apiHelper.findAll(res, 'vacant');
});

module.exports = router;
