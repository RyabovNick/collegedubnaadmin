/**
 * CRUD eduStandarts
 */
const router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    auth = require('../../auth'),
    pool = require('../../../config/config'),
    formidable = require('formidable'),
    fse = require('fs-extra');

/**
 * GET - from public
 * POST
 * PUT - в upload.js ('/admin/upload/:table)
 * DELETE
 */
router
    .route('/admin/eduStandarts')
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'edustandartdoc', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        const id = req.body.id;

        pool.query(
            'Select edu.link as path From `edustandartdoc` edu where edu.id = ?',
            id,
            (error, result) => {
                if (error) {
                    // console.log('error: ', error);
                    return res.status(400).send(error);
                }
                if (result.length == 0) {
                    return res.sendStatus(204);
                } else {
                    fse.remove(`../files/${result[0].path}`)
                        .then(() => {
                            apiHelper.drop(res, 'edustandartdoc', { id: id });
                        })
                        .catch((err) => {
                            return res.status(400).send(err);
                        });
                }
            }
        );
    });

module.exports = router;
