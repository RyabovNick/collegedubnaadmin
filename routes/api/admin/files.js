/**
 * API for common JUST CRUD
 */
const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const auth = require('../../auth');
const pool = require('../../../config/config');

/**
 * get all from files table
 */
router.route('/admin/files').get(auth.required, (req, res, next) => {
    pool.query(
        "Select f.name, p.path, concat('/files/', p.path, '/', f.name) as path_to_add " +
            'From `paths` p ' +
            'INNER JOIN `files` f ON p.id = f.id_path',
        function(error, result) {
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
