/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

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
