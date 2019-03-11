/**
 * id, name, link
 * Delete row,
 * update row,
 * upload and insert
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');

/**
 * go to upload.js
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
