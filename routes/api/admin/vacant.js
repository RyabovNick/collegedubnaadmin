/**
 * Create, Update, Delete
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');

/**
 * vacant
 */
router
    .route('/admin/vacant')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'vacant', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'vacant', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'vacant', req.body);
    });

module.exports = router;
