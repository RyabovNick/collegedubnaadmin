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
                if (err) throw err;
                con.query('Select email, hash from `users` where username = ?', [email], function(
                    error,
                    result
                ) {
                    if (result.length != 0) {
                        if (result[0].email == email) {
                            let hash = validPassword(password);
                            if (hash == result[0].hash) {
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
                        con.release();
                        if (error) throw error;
                    } else {
                        return done(null, false, {
                            errors: { 'email or password': 'не верно' },
                        });
                    }
                });
            });
        }
    )
);

function validPassword(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}
