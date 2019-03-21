/**
 * API for upload files using
 * formidable library https://github.com/felixge/node-formidable
 */
var router = require('express').Router(),
    pool = require('../../../config/config'),
    formidable = require('formidable'),
    util = require('util'),
    os = require('os'),
    fse = require('fs-extra'),
    auth = require('../../auth');

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
router.post('/admin/upload/:table', auth.required, function(req, res, next) {
    var table = req.params.table;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    dir = `../collegedubna/static/files/${table}/`;
    form.keepExtensions = true;

    fse.ensureDir(dir, (err) => {
        console.log(err);
    });

    form.uploadDir = dir;

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
router.post('/admin/education/upload/:row/:tuple', auth.required, function(req, res, next) {
    var tuple = req.params.tuple;
    var row = req.params.row;
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    form.uploadDir = '../collegedubna/static/files/education/';
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
                    'Update `eduop` set ?? = ? where `id` = ?',
                    [tuple, `education/${files.upload.name}`, row],
                    function(error, result) {
                        if (error) return res.status(406).send(error);
                        query_result.push(result);
                        con.release();
                        res.send(result);
                    }
                );
            });
        });
});

/**
 * Add news
 */
router.post('/admin/upload_news', auth.required, function(req, res, next) {
    var form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    dir = '../collegedubna/static/files/news/';
    form.keepExtensions = true;

    let date = new Date();
    const dateNow =
        ('0' + date.getDate()).slice(-2) +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        String(date.getFullYear()).substring(2);

    fse.ensureDir(dir + dateNow, (err) => {
        console.log(err);
    });

    form.uploadDir = dir + dateNow;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
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
                con.query(
                    'Insert into `news` (title,content,date_now,logo) values (?,?,?,?)',
                    [
                        fields.title,
                        fields.content,
                        fields.date_now,
                        `news/${dateNow}/${files.upload.name}`,
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
router.post('/admin/upload_news/:table/:idnews', auth.required, function(req, res, next) {
    var table = req.params.table;
    var idnews = req.params.idnews;

    var form = new formidable.IncomingForm(),
        files = {},
        fields = {},
        allFiles = [];

    dir = '../collegedubna/static/files/news/';
    form.keepExtensions = true;
    form.multiples = true;

    let date = new Date();
    const dateNow =
        ('0' + date.getDate()).slice(-2) +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        String(date.getFullYear()).substring(2);

    fse.ensureDir(dir + dateNow, (err) => {
        console.log(err);
    });

    form.uploadDir = dir + dateNow;

    var query_result = []; //save all insert responses

    form.parse(req)
        // переименовывание файла (без генерации уникального имени)
        .on('fileBegin', function(name, file) {
            file.path = form.uploadDir + '/' + file.name;
        })
        .on('file', function(name, file) {
            files[name] = file;
            allFiles.push({ name, file });
        })
        .on('field', function(name, field) {
            fields[name] = field;
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

                allFiles.forEach(function(el) {
                    con.query(
                        'Insert into ?? (idnews,name,link) values (?,?,?)',
                        [table, idnews, el.file.name, `news/${dateNow}/${files.upload.name}`],

                        function(error, result) {
                            if (error) return res.status(406).send(error);
                            query_result.push(result);
                        }
                    );
                });
                con.release();
                res.end();
            });
        });
});

module.exports = router;
