/**
 * API for news
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * apiHelper get response, tablename
 * and send response to server
 * Is it rigth? Fucking doubt, need to do it right
 */
router.get('/news', function(req, res, next) {
    apiHelper.findAllWithOrder(res, 'news', 'date_now');
});

/**
 * get news by id
 */
router.get('/news/:id', function(req, res, next) {
    apiHelper.findById(res, 'news', req.params['id']);
});

/**
 * Get photo for news
 */
router.get('/news/:id/photo', function(req, res, next) {
    apiHelper.findByField(res, 'photo', 'idnews', req.params['id']);
});

/**
 * Get docs for news
 */
router.get('/news/:id/docs', function(req, res, next) {
    apiHelper.findByField(res, 'newsdocs', 'idnews', req.params['id']);
});

/**
 * Get news on page
 * Page > 0 - if exist return 20 news
 * Page <= 0 return 6 last news
 */
router.get('/news/page/:page', function(req, res, next) {
    var from = 0;
    var to = 6;
    if (req.params['page'] > 0) {
        from = (req.params['page'] - 1) * 20;
        to = 20;
    }
    apiHelper.findWithLimit(res, 'news', 'date_now', from, to);
});

router.get('/newscount', (req, res, next) => {
    pool.query('Select count(*) as news_count from `news`', (error, result) => {
        if (error) return res.status(400).send(error);
        if (result.length == 0) {
            return res.sendStatus(204);
        } else {
            return res.send(result);
        }
    });
});

module.exports = router;
