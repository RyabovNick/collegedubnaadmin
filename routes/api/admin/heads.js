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
    .route('/admin/heads')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'heads', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'heads', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'heads', req.body);
    });

module.exports = router;
