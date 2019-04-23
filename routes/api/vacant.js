/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/vacant', function(req, res, next) {
    pool.query('Select * from vacant order by code, course', (error, result) => {
        res.send(result);
    });
});

module.exports = router;
