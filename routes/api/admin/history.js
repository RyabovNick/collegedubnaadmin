/**
 * API for common JUST CRUD
 */
const router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    auth = require('../../auth'),
    pool = require('../../../config/config');

/**
 * get all from common
 */
router.route('/admin/history').get(auth.required, function(req, res, next) {
    pool.query(
        'Select ph.id, p.page_ru_name as name, ph.date ' +
            'FROM `pages` p ' +
            'INNER JOIN `pageshistory` ph ON p.id = ph.id_page ' +
            'ORDER BY ph.date desc',
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

router.route('/admin/history/:id').get(auth.required, function(req, res, next) {
    apiHelper.findById(res, 'pageshistory', req.params.id);
});

module.exports = router;
