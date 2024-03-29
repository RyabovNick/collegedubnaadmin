require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const errorhandler = require('errorhandler');
const https = require('https');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'development';

const sslOptions = {
    pfx: fs.readFileSync('./sslcert.pfx'),
    passphrase: '12345678',
};

const app = express();

app.use(cors());

//Express config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(
    session({
        secret: process.env.SECRET,
        cookit: { maxAge: 60 * 24 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
    })
);

if (!isProduction) {
    app.use(errorhandler());
}

require('./config/passport');
app.use(require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
        // console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

// http
var server = app.listen(process.env.PORT || 3000, function() {
    // console.log('Listening on port ' + server.address().port);
});

// https.createServer(sslOptions, app).listen(process.env.PORT || 3000, () => {
//     // console.log(`Listening ...`);
// });

module.exports = router;
module.exports = app;
