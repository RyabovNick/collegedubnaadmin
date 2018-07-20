/**
 * API for upload
 */
var router = require('express').Router(),
    pool = require('../../config/config'),
    formidable = require('formidable'),
    util = require('util'),
    os = require('os');

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

router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    //form.uploadDir = os.homedir();
    form.uploadDir = './files';
    form.keepExtensions = true;

    form.on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
    })
        .on('file', function(field, file) {
            console.log(field, file);
            files.push([field, file]);
            pool.getConnection(function(err, con) {
                if (err) throw err;
                con.query(
                    'Insert into `documents` (tag,name,link) values (?,?,?)',
                    [file.type, file.name, file.path],
                    function(error, result) {
                        if (error) throw error;
                        //res.send(result);
                        con.release();
                    }
                );
            });
        })
        .on('end', function() {
            console.log('-> upload done');
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received fields:\n\n ' + util.inspect(fields));
            res.write('\n\n');
            res.end('received files:\n\n ' + util.inspect(files));
        });
    form.parse(req);
});

module.exports = router;
