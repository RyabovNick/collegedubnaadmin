/**
 * API for news
 */
var pool = require('../../config/config');

/**
 * Select all from table
 * @param {string} table - table name
 */
var findAll = function(tablename) {
    pool.getConnection(function(err, con) {
        console.log(tablename);
        if (err) throw err;
        con.query('Select * from `news`', function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                return sendStatus(401);
            } else {
                return result;
            }
            con.release();
        });
    });
};

exports.findAll = findAll;

/**
 * Select all rows from table for current id
 * @param {string} table - table name
 * @param {int} id - value
 */
module.exports = function findById(table, id) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from ?? where id = ?', [table, id], function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                return res.sendStatus(401);
            } else {
                return res.send(result);
            }
            con.release();
        });
    });
};

/**
 * Select all rows from table with where expression
 * @param {string} table - table name
 * @param {*} field - what field are you looking for
 * @param {*} value - the field value
 */
module.exports = function findByField(table, field, value) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('Select * from ?? where ? = ?', [table, field, value], function(error, result) {
            if (error) throw error;
            if (result.length == 0) {
                return res.sendStatus(401);
            } else {
                return res.send(result);
            }
            con.release();
        });
    });
};

module.exports = findAll;
