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
    .route('/admin/paths')
    .get(auth.required, (req, res, next) => {
        apiHelper.select(res, 'paths');
    })
    .post(auth.required, (req, res, next) => {
        apiHelper.insert(res, 'paths', req.body);
    })
    .put(auth.required, (req, res, next) => {
        apiHelper.update(res, 'paths', req.body);
    })
    .delete(auth.required, (req, res, next) => {
        apiHelper.drop(res, 'paths', req.body);
    });

module.exports = router;
