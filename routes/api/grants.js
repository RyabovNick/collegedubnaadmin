/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/graduatejob', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query('Select * from `graduatejob` order by `year` desc, `code` asc ', function(
            error,
            result
        ) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
});

/**
 * get all from common
 */
router.get('/hostelinfo', function(req, res, next) {
    apiHelper.findAll(res, 'hostelinfo');
});

/**
 * get all from common
 */
router.get('/grantsdocs', function(req, res, next) {
    apiHelper.findAll(res, 'grantsdocs');
});

module.exports = router;
