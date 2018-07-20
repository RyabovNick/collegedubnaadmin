/**
 * API for news
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

router.get('/news', function(req, res, next) {
    //console.log(typeof apiHelper.findAll('news'));
    console.log('test');
    console.log(apiHelper.findAll('news'));
    return res.send('test');
    /*pool.getConnection(function(err, con) {
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
    });*/
});

(module.exports = router), apiHelper;
