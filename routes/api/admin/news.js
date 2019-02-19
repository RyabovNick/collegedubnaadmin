/**
 * create news with uploading
 * docs and photos
 *
 * update news (text)
 * and photo/docs
 *
 * delete news and docs/photos
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');
const pool = require('../../../config/config');

/**
 * get all from common
 */
router
    .route('/admin/news')
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'news', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'news', req.body);
    });

router.route('/admin/listnews').get(auth.required, (req, res, next) => {
    pool.query('Select id, title, date_now from `news` order by date_now desc', function(
        error,
        result
    ) {
        if (error) return res.status(400).send(error);
        if (result.length == 0) {
            return res.sendStatus(204);
        } else {
            return res.send(result);
        }
    });
});

router
    .route('/admin/newsdocs')
    .get(auth.required, function(req, res, next) {
        apiHelper.select(res, 'newsdocs');
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'newsdocs', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'newsdocs', req.body);
    });

router
    .route('/admin/newsphoto')
    .get(auth.required, function(req, res, next) {
        apiHelper.select(res, 'photo');
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'photo', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'photo', req.body);
    });

module.exports = router;
