var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pool = require('./config');
var crypto = require('crypto');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user[email]',
            passwordField: 'user[password]',
        },
        function(email, password, done) {
            pool.getConnection(function(err, con) {
                if (err) return res.status(406).send(err);
                con.query(
                    'Select id, email, hash, salt from `users` where username = ?',
                    [email],
                    function(error, result) {
                        if (result.length != 0) {
                            if (error) return res.status(400).send(error);
                            if (result[0].email == email) {
                                let hash = validPassword(password, result[0].salt);
                                if (hash == result[0].hash) {
                                    var user = [result[0].id, email];
                                    return done(null, user);
                                } else {
                                    return done(null, false, {
                                        errors: { 'email or password': 'не верно' },
                                    });
                                }
                            } else {
                                return done(null, false, {
                                    errors: { 'email or password': 'не верно' },
                                });
                            }
                        } else {
                            return done(null, false, {
                                errors: { 'email or password': 'не верно' },
                            });
                        }
                    }
                );
            });
        }
    )
);

function validPassword(password, salt) {
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return hash;
}
