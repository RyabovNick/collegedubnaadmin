/**
 * Insert, Update, Delete Helpers
 */
var pool = require('../../../config/config'),
    async = require('async');

/**
 * Get all
 * @param {*} res
 * @param {*} tablename
 */
var select = function(res, tablename) {
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
 * Insert data to table
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {JSON} data - JSON (req.body)
 */
var insert = function(res, table, data) {
    var keys = Object.keys(data),
        values = keys.map(function(key) {
            return "'" + data[key] + "'";
        });
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query(
            'INSERT INTO ?? (' + keys.join(',') + ') VALUES (' + values.join(',') + ')',
            [table],
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
 * Update data from table. Id get from JSON (data)
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {JSON} data - JSON (req.body)
 */
var update = function(res, table, data) {
    var keys = Object.keys(data),
        values = Object.values(data);

    //prepared string to update query
    //short if for last ','
    var prepared_string = '';
    for (i = 0; i < keys.length; i++) {
        prepared_string += keys[i] + ' = ' + "'" + values[i] + "'";
        prepared_string += i == keys.length - 1 ? '' : ',';
    }

    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('UPDATE ?? SET ' + prepared_string + ' where id = ?', [table, data.id], function(
            error,
            result
        ) {
            if (error) {console.log(error); return res.status(400).send(error)};
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
 * Delete row from table. Id get from JSON (data)
 * @param {response} res - send response from API
 * @param {string} table - table name
 * @param {JSON} data - JSON (req.body)
 */
var drop = function(res, table, data) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query('DELETE FROM ?? where id = ?', [table, data.id], function(error, result) {
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
    select: select,
    insert: insert,
    drop: drop,
    update: update,
};
