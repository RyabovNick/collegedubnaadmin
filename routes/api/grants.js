/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/graduatejob', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from `graduatejob` order by `year` desc, `code` asc ', function(
            error,
            result
        ) {
            if (error) throw error;
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
