/**
 * Go to users or error
 */
const router = require('express').Router();

router.use('/', require('./users'));
router.use('/', require('./news'));
router.use('/', require('./common'));
router.use('/', require('./eduStandarts'));
router.use('/', require('./grants'));
router.use('/', require('./objects'));
router.use('/', require('./vacant'));
router.use('/', require('./employees'));
router.use('/', require('./education'));
router.use('/', require('./gallery'));
router.use('/', require('./admin/common'));
router.use('/', require('./admin/education'));
router.use('/', require('./admin/eduStandarts'));
router.use('/', require('./admin/employees'));
router.use('/', require('./admin/grants'));
router.use('/', require('./admin/heads'));
router.use('/', require('./admin/objects'));
router.use('/', require('./admin/pages'));
router.use('/', require('./admin/upload'));
router.use('/', require('./admin/vacant'));
router.use('/', require('./admin/news'));
router.use('/', require('./admin/gallery'));
router.use('/', require('./admin/known_content_pages'));
router.use('/', require('./admin/paths'));
router.use('/', require('./admin/files'));
router.use('/', require('./admin/history'));
router.use('/', require('./pages'));
router.use('/', require('./homeimgs'));
router.use('/', require('./known_content_pages'));

router.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {}),
        });
    }

    return next(err);
});

module.exports = router;
