/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');

/**
 * get all from common
 */
router.get('/purposecab', function(req, res, next) {
    apiHelper.findAll(res, 'purposecab');
});

/**
 * get all from common
 */
router.get('/purposelibr', function(req, res, next) {
    apiHelper.findAll(res, 'purposelibr');
});

/**
 * get all from common
 */
router.get('/purposeeios', function(req, res, next) {
    apiHelper.findAll(res, 'purposeeios');
});

/**
 * get all eduCode
 */
router.get('/educode', function(req, res, next) {
    pool.query(
        'SELECT distinct edua.id, concat(edua.eduCode, " ", edua.eduName) as cab_head ' +
            'FROM eduaccred_cabinets ec ' +
            'INNER JOIN eduaccred edua on edua.id = ec.edu_id',
        (error, result) => {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                return res.sendStatus(204);
            } else {
                return res.send(result);
            }
        }
    );
});

/**
 * get all cabinets for id eduCode (eduAccred)
 */
router.get('/cabinets/:id', function(req, res, next) {
    const id = req.params['id'];
    pool.query(
        'SELECT edca.name as discipline, cab.name as cabname, cab.address, cab.forDisabled as forDisabled ' +
            'FROM eduaccred edua ' +
            'INNER JOIN eduaccred_cabinets edca on edua.id = edca.edu_id ' +
            'INNER JOIN cabinets cab on cab.id = edca.cabinet_id ' +
            'where edua.id = ?',
        [id],
        (error, result) => {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                return res.sendStatus(204);
            } else {
                return res.send(result);
            }
        }
    );
});

module.exports = router;
