/**
 * API for common
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');

/**
 * get Priem
 */
router.get('/environment/:id', function(req, res, next) {
    const id = req.params['id'];
    pool.query(
        'SELECT kcpc.id as id, kcpc.page_id as page_id, kcpc.type as type, kcpc.link as link ' +
            'FROM `known_content_pages` kcp ' +
            'INNER JOIN  `kcp_content` kcpc ON kcp.`id` =  kcpc.`page_id` ' +
            'where kcp.id = ?',
        [id],
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
