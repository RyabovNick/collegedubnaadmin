/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get all from common
 */
router.get('/gallery', function(req, res, next) {
    apiHelper.findAll(res, 'gallery');
});

module.exports = router;
