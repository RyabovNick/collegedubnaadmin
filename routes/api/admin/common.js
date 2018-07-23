/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config');

/**
 * get all from common
 */
router
    .route('/common')
    .post(function(req, res, next) {
        apiHelper.insert(res, 'common', req.body);
    })
    .put(function(req, res, next) {
        apiHelper.update(res, 'common', req.body);
    })
    .delete(function(req, res, next) {
        apiHelper.drop(res, 'common', req.body);
    });

module.exports = router;
