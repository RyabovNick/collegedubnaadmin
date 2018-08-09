/**
 * create news with uploading
 * docs and photos
 *
 * update news (text)
 * and photo/docs
 *
 * delete news and docs/photos
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

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
