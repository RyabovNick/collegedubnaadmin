/**
 * link to the APIs
 */
var router = require('express').Router();

router.use('/api', require('./api'));

module.exports = router;
