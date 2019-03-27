/**
 * CRUD eduStandarts
 */
const router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    auth = require('../../auth');

/**
 * GET - from public
 * POST
 * PUT - в upload.js ('/admin/upload/:table)
 * DELETE
 */
router
    .route('/admin/eduStandarts')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'edustandartdoc', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'edustandartdoc', req.body);
    });

module.exports = router;
