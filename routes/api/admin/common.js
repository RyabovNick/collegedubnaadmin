/**
 * API for common JUST CRUD
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

/**
 * get all from common
 */
router
    .route('/common')
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
