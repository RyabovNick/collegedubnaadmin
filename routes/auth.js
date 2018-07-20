/**
 * auth.required to the page without public accces
 */
var jwt = require('express-jwt'),
    secret = require('../config').secret;

/**
 * Find token in header and return authorization part
 * @param {*} req - all header parameters
 */
function getTokenFromHeader(req) {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

/**
 * JSON
 */
var auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader,
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader,
    }),
};

module.exports = auth;
