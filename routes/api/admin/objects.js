/**
 * purposecab
 * purposeeios
 *
 * Create, Update, Delete
 *
 * purposeeios - UPLOAD.js
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');

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

router
    .route('/admin/objects/purposelibr')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'purposelibr', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'purposelibr', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'purposelibr', req.body);
    });

router
    .route('/admin/objects/cabinets')
    .get(auth.required, (req, res, next) => {
        apiHelper.select(res, 'cabinets');
    })
    .post(auth.required, (req, res, next) => {
        apiHelper.insert(res, 'cabinets', req.body);
    })
    .put(auth.required, (req, res, next) => {
        apiHelper.update(res, 'cabinets', req.body);
    })
    .delete(auth.required, (req, res, next) => {
        apiHelper.drop(res, 'cabinets', req.body);
    });

router
    .route('/admin/objects/educabs')
    .get(auth.required, (req, res, next) => {
        apiHelper.select(res, 'eduaccred_cabinets');
    })
    .post(auth.required, (req, res, next) => {
        apiHelper.insert(res, 'eduaccred_cabinets', req.body);
    })
    .put(auth.required, (req, res, next) => {
        apiHelper.update(res, 'eduaccred_cabinets', req.body);
    })
    .delete(auth.required, (req, res, next) => {
        apiHelper.drop(res, 'eduaccred_cabinets', req.body);
    });

module.exports = router;
