/**
 *
 */

const router = require('express').Router();
const apiHelper = require('./adminAPIHelper');
const pool = require('../../../config/config');
const auth = require('../../auth');

/**
 * go to upload.js
 */

/**
 * Получение всех страниц
 */
router.route('/admin/kcp_pages').get(auth.required, (req, res, next) => {
    apiHelper.select(res, 'known_content_pages');
});

/**
 * Получение страниц и содержимого
 */
router
    .route('/admin/environment')
    .get(auth.required, (req, res, next) => {
        pool.query(
            'SELECT kcpc.id as id, kcp.name, kcp.name_ru, kcpc.page_id as page_id, kcpc.type as type, kcpc.link as link ' +
                'FROM `known_content_pages` kcp ' +
                'INNER JOIN  `kcp_content` kcpc ON kcp.`id` =  kcpc.`page_id`',
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    return res.sendStatus(204);
                } else {
                    return res.send(result);
                }
            }
        );
    })
    .post(auth.required, function(req, res, next) {
        apiHelper.insert(res, 'kcp_content', req.body);
    })
    .put(auth.required, function(req, res, next) {
        apiHelper.update(res, 'kcp_content', req.body);
    })
    .delete(auth.required, function(req, res, next) {
        apiHelper.drop(res, 'kcp_content', req.body);
    });

module.exports = router;
