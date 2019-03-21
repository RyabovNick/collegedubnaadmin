/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/gallery', function(req, res, next) {
    apiHelper.findAllWithOrderAsc(res, 'gallery', 'number');
});

module.exports = router;
