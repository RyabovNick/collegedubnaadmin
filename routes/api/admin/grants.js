/**
 * grants
 * graduatejob - create, alter, drop
 * hostelinfo - create, alter, drop
 * grantsdocs - go to upload.js (create, drop)
 */
const router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    auth = require('../../auth');

/**
 * go to upload.js
 */
router
    .route('/admin/grants/graduatejob')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'graduatejob', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'graduatejob', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'graduatejob', req.body);
    });

router
    .route('/admin/grants/hostelinfo')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'hostelinfo', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'hostelinfo', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'hostelinfo', req.body);
    });

module.exports = router;
