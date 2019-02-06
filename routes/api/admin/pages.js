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

/**
 * get all from common
 */
router
    .route('/admin/pages')
    .get(auth.required, function(req, res, next) {
        apiHelper.select(res, 'pages');
    })
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'pages', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'pages', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'pages', req.body);
    });

router.route('/admin/pageshistory').get(auth.required, function(req, res, next) {
    apiHelper.select(res, 'pageshistory');
});

module.exports = router;
