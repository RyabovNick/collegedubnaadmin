/**
 * API for news
 */
var pool = require('../../config/config'),
    async = require('async');

/**
 * Select all from table
 * @param {response} res - send response from API
 * @param {string} table - table name
 */
var findAll = function(res, tablename) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from ??', [tablename], function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                con.release();
                return res.sendStatus(401);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

/**
 * Select all rows from table for current id
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {int} id - value
 */
var findById = function findById(res, table, id) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from ?? where id = ?', [table, id], function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                con.release();
                return res.sendStatus(401);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

/**
 * Select all rows from table with where expression
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {string} field - what field are you looking for
 * @param {string, int} value - the field value
 */
var findByField = function(res, table, field, value) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from ?? where ? = ?', [table, field, value], function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                con.release();
                return res.sendStatus(401);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

/**
 * Search API
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {string} field - what field are you looking for
 * @param {string, int} value - the field value
 */
var findByLike = function(res, table, field, value) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query("Select * from ?? where ? like '%?%'", [table, field, value], function(
            error,
            result
        ) {
            if (error) throw error;
            if (result.length == 0) {
                con.release();
                return res.sendStatus(401);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

module.exports = {
    findAll: findAll,
    findById: findById,
    findByField: findByField,
    findByLike: findByLike,
};
