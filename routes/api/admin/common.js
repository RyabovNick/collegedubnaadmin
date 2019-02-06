/**
 * API for common JUST CRUD
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');

/**
 * get all from common
 */
router
    .route('/admin/common')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'common', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'common', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'common', req.body);
    });

module.exports = router;
