/**
 * API for news
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get pages by id
 */
router.get('/homeimgs', function(req, res, next) {
    apiHelper.findAll(res, 'homeimgs');
});

module.exports = router;
