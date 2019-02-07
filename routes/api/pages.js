/**
 * API for news
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');

/**
 * get pages by id
 */
router.get('/pages/:id', function(req, res, next) {
    apiHelper.findById(res, 'pages', req.params['id']);
});

module.exports = router;
