/**
 * Create, update, delete
 * Heads,
 * TeachingStaff
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');

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
