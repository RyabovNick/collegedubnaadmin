/**
 *
 */

var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

/**
 * go to upload.js
 */
router
    .route('/admin/education/eduaccred')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'eduaccred', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'eduaccred', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'eduaccred', req.body);
    });

router
    .route('/admin/education/educhislen')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'educhislen', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'educhislen', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'educhislen', req.body);
    });

router
    .route('/admin/education/edupriem')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'edupriem', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'edupriem', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'edupriem', req.body);
    });

router
    .route('/admin/education/eduperevod')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'eduperevod', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'eduperevod', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'eduperevod', req.body);
    });

module.exports = router;
