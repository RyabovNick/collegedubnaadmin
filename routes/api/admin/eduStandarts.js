/**
 * id, name, link
 * Delete row,
 * update row,
 * upload and insert
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

/**
 * get all from common
 */
router
    .route('/admin/eduStandatrs')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'eduStandatrs', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'eduStandatrs', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'eduStandatrs', req.body);
    });

module.exports = router;
