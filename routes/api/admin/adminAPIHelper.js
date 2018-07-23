var pool = require('../../../config/config'),
    async = require('async');

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
    insert: insert,
    drop: drop,
    update: update,
};
