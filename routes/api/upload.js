/**
 * API for upload files using
 * formidable library https://github.com/felixge/node-formidable
 */
var router = require('express').Router(),
    pool = require('../../config/config'),
    formidable = require('formidable'),
    util = require('util'),
    os = require('os');

/**
 * upload form for testing
 */
router.get('/upload_form', function(req, res, next) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/api/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
    );
});

/**
 * Upload API
 *
 * TODO:
 * 1. auth !!!
 */
router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.uploadDir = './files';
    form.keepExtensions = true;

    pool.getConnection(function(err, con) {
        if (err) throw err;
        var query_result = []; //save all insert responses
        form.on('field', function(field, value) {
            console.log(field, value);
            fields.push([field, value]);
        })
            .on('file', function(field, file) {
                console.log(field, file);
                files.push([field, file]); //push file to folder
                con.query(
                    'Insert into `documents` (tag,name,link) values (?,?,?)',
                    [file.type, file.name, file.path],
                    function(error, result) {
                        if (error) throw error;
                        console.log(result);
                        query_result.push(result);
                    }
                );
            })
            .on('end', function() {
                console.log('-> upload done');
                console.log(query_result);
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.write('received fields:\n\n ' + util.inspect(fields));
                res.write('\n\n');
                res.write('received files:\n\n ' + util.inspect(files));
                res.end('\n\n ' + query_result);
                con.release();
            });
    });

    form.parse(req);
});

module.exports = router;
