var router = require('express').Router();
var passport = require('passport');
var pool = require('../../config/config');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../../config').secret;
var auth = require('../auth.js');

/**
 * Auth
 */
router.get('/user', auth.required, function(req, res, next) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select id, email from `users` where id = ?', [req.payload.id], function(
            error,
            result
        ) {
            if (error) throw error;
            if (result.length == 0) {
                return res.sendStatus(401);
            } else {
                return res.json({ user: toAuthJSON([result[0].id, result[0].email]) });
            }
            con.release();
        });
    });
});
/**
 * Authentfication api
 * Get email and password in JSON
 * Open passport.js
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
            var token = generateJWT(user);
            return res.json({ user: toAuthJSON(user) });
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

/**
 * Prepare password to save in db
 * @param {string} password - User password
 */
function setPassword(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return [hash, salt];
}

/**
 * Generate JWT
 * @param {Array} user - id and username for JWT token payload
 */
function generateJWT(user) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            id: user[0],
            username: user[1],
            exp: parseInt(exp.getTime() / 1000),
        },
        secret
    );
}

/**
 * Return token to user
 * @param {Array} user - id, email
 */
function toAuthJSON(user) {
    return {
        email: user[1],
        token: generateJWT(user),
    };
}

module.exports = router;
