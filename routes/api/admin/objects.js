/**
 * purposecab
 * purposeeios
 *
 * Create, Update, Delete
 *
 * purposeeios - UPLOAD.js
 */
var router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    pool = require('../../../config/config'),
    auth = require('../../auth');

/**
 * go to upload.js
 */
router
    .route('/admin/objects/purposecab')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'purposecab', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'purposecab', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'purposecab', req.body);
    });

router
    .route('/admin/objects/purposeeios')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'purposeeios', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'purposeeios', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'purposeeios', req.body);
    });

module.exports = router;
