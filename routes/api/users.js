var router = require('express').Router();
var passport = require('passport');
var pool = require('../../config/config');

router.post('/user/login', function(req, res, next) {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: 'Не может быть пустым' } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: 'Не может быть пустым' } });
    }

    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            user.token = user.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

router.get('/test', function(req, res, next) {
    return res.json({ test: { what: "It's working" } });
});

module.exports = router;
