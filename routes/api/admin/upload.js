/**
 * API for upload files using
 * formidable library https://github.com/felixge/node-formidable
 */
var router = require('express').Router(),
    pool = require('../../../config/config'),
    formidable = require('formidable'),
    util = require('util'),
    os = require('os'),
    fse = require('fs-extra');

/**
 * upload form for testing
 */
router.get('/upload_form', function(req, res, next) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/api/admin/upload_news/newsdocs" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="idnews"><br>' +
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
router.post('/admin/upload/:table', function(req, res, next) {
    var table = req.params.table;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    form.uploadDir = `../collegedubna/static/files/${table}/`;
    form.keepExtensions = true;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            file.path = form.uploadDir + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
        })
        .on('field', function(name, field) {
            fields[name] = field;
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            pool.getConnection(function(err, con) {
                if (err) return res.status(406).send(err);
                con.query(
                    'Insert into ?? (name,link) values (?,?)',
                    [table, fields.name, `${table}/${files.upload.name}`],
                    function(error, result) {
                        if (error) return res.status(406).send(error);
                        console.log(result);
                        query_result.push(result);
                        con.release();
                        res.send(result);
                    }
                );
            });
        });
});

/**
 * objects purposelibr add information with fileupload
 
router.post('/admin/objects/purposelibr', function(req, res, next) {
    var table = req.params.table;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    form.uploadDir = '../collegedubna/static/files/';
    form.keepExtensions = true;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            file.path = form.uploadDir + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
        })
        .on('field', function(name, field) {
            fields[name] = field;
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            pool.getConnection(function(err, con) {
                if (err) return res.status(406).send(err);
                con.query(
                    'Insert into `purposelibr` (name,area,placecount,docs) values (?,?,?,?)',
                    [fields.name, fields.area, fields.placecount, files.upload.path],
                    function(error, result) {
                        if (error) return res.status(406).send(error);
                        console.log(result);
                        query_result.push(result);
                        con.release();
                        res.end();
                    }
                );
            });
        });
});
*/
/**
 * eduOP file upload
 */
router.post('/admin/education/upload/:row/:tuple', function(req, res, next) {
    var tuple = req.params.tuple;
    var row = req.params.row;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    form.uploadDir = '../collegedubna/static/files/';
    form.keepExtensions = true;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            file.path = form.uploadDir + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
        })
        .on('field', function(name, field) {
            fields[name] = field;
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            console.log('files.upload: ', files.upload);
            pool.getConnection(function(err, con) {
                if (err) return res.status(406).send(err);
                con.query(
                    'Update `eduop` set ?? = ? where `id` = ?',
                    [tuple, files.upload.path, row],
                    function(error, result) {
                        if (error) return res.status(406).send(error);
                        console.log(result);
                        query_result.push(result);
                        con.release();
                    }
                );
            });
        });
});

/**
 * Add news
 */
router.post('/admin/upload_news', function(req, res, next) {
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    dir = '../collegedubna/static/files/';
    form.keepExtensions = true;

    let date = new Date();
    const dateNow =
        ('0' + date.getDate()).slice(-2) +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        String(date.getFullYear()).substring(2);
    console.log('dateNow: ', dateNow);

    fse.ensureDir(dir + dateNow, (err) => {
        console.log(err);
    });

    form.uploadDir = dir + dateNow;
    console.log('form.uploadDir: ', form.uploadDir);

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            console.log('form.uploadDir 2 : ', form.uploadDir);
            file.path = form.uploadDir + '/' + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
        })
        .on('field', function(name, field) {
            fields[name] = field;
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            pool.getConnection(function(err, con) {
                if (err) {
                    return res.status(406).send(err);
                }
                console.log('files.upload: ', files.upload);
                con.query(
                    'Insert into `news` (title,content,date_now,logo) values (?,?,?,?)',
                    [
                        fields.title,
                        fields.content,
                        fields.date_now,
                        `${dateNow}/${files.upload.name}`,
                    ],
                    function(error, result) {
                        if (error) {
                            return res.status(406).send(error);
                        }
                        query_result.push(result);
                        con.release();
                        res.send(result);
                    }
                );
            });
        });
});

/**
 * upload docs / photos to news
 */
router.post('/admin/upload_news/:table', function(req, res, next) {
    var table = req.params.table;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {},
        allFiles = [];

    form.uploadDir = '../collegedubna/static/files/';
    form.keepExtensions = true;
    form.multiples = true;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            file.path = form.uploadDir + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
            allFiles.push({ name, file });
            console.log('file: ' + file);
        })
        .on('field', function(name, field) {
            fields[name] = field;
            console.log('field: ' + fields);
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            if (fields.name == '') {
                fields.name = files.upload.name;
            }
            pool.getConnection(function(err, con) {
                if (err) return res.status(406).send(err);
                /*array1.forEach(function(element) {
				  console.log(element);
				});
				*/
                allFiles.forEach(function(el) {
                    con.query(
                        'Insert into ?? (idnews,name,link) values (?,?,?)',
                        [table, fields.idnews, el.file.name, el.file.path],
                        function(error, result) {
                            if (error) return res.status(406).send(error);
                            console.log(result);
                            query_result.push(result);
                        }
                    );
                });
                con.release();
            });
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end();
        });
});

module.exports = router;
