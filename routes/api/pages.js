/**
 * API for news
 */
const router = require('express').Router();
const apiHelper = require('./apiHelper');
const pool = require('../../config/config');
const extend = require('extend');

/**
 * get pages by id
 */
router.get('/pages/:id', function(req, res, next) {
    apiHelper.findById(res, 'pages', req.params['id']);
});

router.get('/pages_part/:id', (req, res, next) => {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);

        con.query(
            `
            Select pp.id, pp.partOrder, pp.content
            From pages p
            INNER JOIN page_part pp ON p.id = pp.page_id
            where p.id = ?
            order by pp.partOrder
            `,
            [req.params['id']],
            (err, result) => {
                if (err) {
                    con.release;
                    return res.status(400).send(err);
                }
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    result.forEach((element, i) => {
                        con.query(
                            `
                            Select ppm.name, ppm.link, ppm.type
                            From page_part_media ppm
                            where ppm.page_part_id = ?
                        `,
                            [element.id],
                            (err1, res1) => {
                                if (err1) {
                                    con.release();
                                    return res.status(400).send(err1);
                                }

                                res1.forEach((el) => {
                                    console.log('el: ', el);
                                    if (el.type == 'img') {
                                        let pair = { img: el };
                                        extend(result[i], pair);
                                    } else if (el.type == 'doc') {
                                        let pair = { doc: el };
                                        extend(result[i], pair);
                                    }
                                });

                                if (i === result.length - 1) {
                                    con.release();
                                    return res.send(result);
                                }
                            }
                        );
                    });
                    // con.release();
                    // return res.send(result);
                }
            }
        );
    });
});

module.exports = router;
