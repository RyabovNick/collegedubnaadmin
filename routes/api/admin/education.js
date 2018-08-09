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
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query(
                'INSERT INTO `eduaccred` (`eduCode`, `eduName`, `eduLevel`, `eduForm`, `learningTerm`, `language`, `dateEnd`)' +
                    ' VALUES (?,?,?,?,?,?,?)',
                [
                    req.body.eduCode,
                    req.body.eduName,
                    req.body.eduLevel,
                    req.body.eduForm,
                    req.body.learningTerm,
                    req.body.language,
                    req.body.dateEnd,
                ],
                function(error, result) {
                    if (error) return res.status(400).send(error);
                    if (result.length == 0) {
                        con.release();
                        return res.sendStatus(204);
                    } else {
                        req.body.years.forEach((year) => {
                            con.query(
                                'Insert INTO `eduop` (`id_eduCode`, `year`) VALUE (?,?)',
                                [result.insertId, year],
                                function(error, result) {
                                    if (error) return res.status(400).send(error);
                                    if (result.length == 0) {
                                        con.release();
                                        return res.sendStatus(204);
                                    }
                                }
                            );
                        });
                        con.release();
                        return res.send(result);
                    }
                }
            );
        });
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
