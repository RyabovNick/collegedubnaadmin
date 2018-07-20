/**
 * API for news
 */
var router = require('express').Router(),
    pool = require('../../config/config');

router.get('/news', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from `news`', function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                return res.sendStatus(401);
            } else {
                return res.send(result);
            }
            con.release();
        });
    });
});

module.exports = router;
