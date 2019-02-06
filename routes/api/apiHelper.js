/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * apiHelper get response, tablename
 * and send response to server
 * Is it right? Fucking doubt, need to do it right
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
        if (err) return res.status(406).send(err);
        con.query('Select * from ??', [tablename], function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
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
        if (err) return res.status(406).send(err);
        con.query('Select * from ?? where id = ?', [table, id], function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
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
        if (err) return res.status(406).send(err);
        con.query('Select * from ?? where ?? = ?', [table, field, value], function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
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
        if (err) return res.status(406).send(err);
        con.query("Select * from ?? where ?? like '%?%'", [table, field, value], function(
            error,
            result
        ) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

/**
 * Search with desc order
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {*} order - order
 */
var findAllWithOrder = function(res, table, order) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query('Select * from ?? order by ?? desc', [table, order], function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
            } else {
                con.release();
                return res.send(result);
            }
        });
    });
};

/**
 * Search with desc order and LIMIT from, to
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {string} order - field for desc order
 * @param {int} from - from
 * @param {int} to - to
 */
var findWithLimit = function(res, table, order, from, to) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query(
            'Select * from ?? order by ?? desc LIMIT ?, ?',
            [table, order, from, to],
            function(error, result) {
                if (error) return res.status(400).send(error);
                if (result.length == 0) {
                    con.release();
                    return res.sendStatus(204);
                } else {
                    con.release();
                    return res.send(result);
                }
            }
        );
    });
};

/**
 * How many rows
 * @param {response} res - send response from API
 * @param {string} table - table name
 */
var countRows = function(res, table) {
    pool.getConnection(function(err, con) {
        if (err) return res.status(406).send(err);
        con.query('Select count(*) from ??', [table], function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                con.release();
                return res.sendStatus(204);
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
    findAllWithOrder: findAllWithOrder,
    findWithLimit: findWithLimit,
    countRows: countRows,
};
