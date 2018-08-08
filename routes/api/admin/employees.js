/**
 * Create, update, delete
 * Heads,
 * TeachingStaff
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

/**
 * go to upload.js
 */
router
    .route('/admin/employees')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'employees', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'employees', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'employees', req.body);
    });

router
    .route('/admin/teachingstaff')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'teachingstaff', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'teachingstaff', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'teachingstaff', req.body);
    });

module.exports = router;
