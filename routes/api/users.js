var router = require('express').Router();
var passport = require('passport');
var pool = require('../../config/config');
var crypto = require('crypto');

/**
 * Authentfication api
 * Get email and password in JSON
 * Check in DB
 * return token if true
 * if false - send error
 */
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

/**
 * Registration API (not using in college, because 1 user)
 */
router.post('/users', function(req, res, next) {
    if (!req.body.user.username || !req.body.user.email || !req.body.user.password) {
        return res.status(422).json({ errors: { 'email or password': 'Не может быть пустым' } });
    }

    var username = req.body.user.username;
    var email = req.body.user.email;
    var password = setPassword(req.body.user.password);

    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query(
            'Insert into `users` (username, email, hash, salt) values (?,?,?,?)',
            [username, email, password[0], password[1]],
            function(error, result) {
                if (error) throw error;
                res.send(result);
                con.release();
            }
        );
    });
});

router.get('/test', function(req, res, next) {
    return res.json({ test: { what: "It's working" } });
});

function setPassword(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    console.log('salt: ' + salt + '\nhash: ' + hash);
    return [hash, salt];
}

module.exports = router;
