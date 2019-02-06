/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/common', function(req, res, next) {
    apiHelper.findAll(res, 'common');
});

module.exports = router;
