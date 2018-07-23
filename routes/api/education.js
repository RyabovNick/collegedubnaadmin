/**
 * API for common
 */
var router = require('express').Router(),
    apiHelper = require('./apiHelper'),
    pool = require('../../config/config');

/**
 * get all from eduaccred
 */
router.get('/eduaccred', function(req, res, next) {
    apiHelper.findAll(res, 'eduaccred');
});

/**
 * get Priem
 */
router.get('/priem', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query(
            'SELECT  `eduaccred`.`eduCode`,  `eduaccred`.`eduName`,' +
                '`eduaccred`.`eduLevel`,  `eduaccred`.`eduForm`,' +
                '`numberBFpriem`,  `numberBRpriem`,  `numberBMpriem`,' +
                '`numberPpriem` FROM  `eduaccred`' +
                'INNER JOIN  `edupriem` ON  `eduaccred`.`id` =  `edupriem`.`id_eduCode`',
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    con.release();
                    return res.send(result);
                }
            }
        );
    });
});

/**
 * get perevod
 */
router.get('/perevod', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query(
            'SELECT  `eduaccred`.`eduCode`,  `eduaccred`.`eduName`,  `eduaccred`.`eduLevel`, `eduaccred`.`eduForm`,' +
                '`numberOutPerevod`, `numberToPerevod`, `numberResPerevod`, `numberExpPerevod`' +
                'FROM  `eduaccred`' +
                'INNER JOIN  `eduperevod` ON  `eduaccred`.`id` =  `eduperevod`.`id_eduCode`',
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    con.release();
                    return res.send(result);
                }
            }
        );
    });
});

/**
 * get perevod
 */
router.get('/eduop', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query(
            'SELECT  `eduaccred`.`eduCode`,  `eduaccred`.`eduName`,  `eduaccred`.`eduLevel`,  `eduaccred`.`eduForm`,`eduop`.`year`,  `opMain`,  `educationPlan`,  `educationAnnotation`,  `educationShedule`, `methodology`, `eduPr`' +
                'FROM  `eduaccred`' +
                'INNER JOIN  `eduop` ON  `eduaccred`.`id` =  `eduop`.`id_eduCode`' +
                'ORDER BY `eduop`.`year` desc, `eduaccred`.`eduCode`',
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    con.release();
                    return res.send(result);
                }
            }
        );
    });
});

/**
 * get chislen
 */
router.get('/chislen', function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query(
            'SELECT  `eduaccred`.`eduCode`,  `eduaccred`.`eduName`,  `eduaccred`.`eduLevel`,  `eduaccred`.`eduForm`,  `numberBFpriem`,  `numberBRpriem`,  `numberBMpriem`,  `numberPpriem`' +
                'FROM  `eduaccred`' +
                'INNER JOIN  `educhislen` ON  `eduaccred`.`id` =  `educhislen`.`id_eduCode` ',
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    con.release();
                    return res.send(result);
                }
            }
        );
    });
});

module.exports = router;
