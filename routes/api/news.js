/**
 * API for news
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * apiHelper get response, tablename
 * and send response to server
 * Is it rigth? Fucking doubt, need to do it right
 */
router.get('/news', function(req, res, next) {
    apiHelper.findAll(res, 'news');
});

module.exports = router;
