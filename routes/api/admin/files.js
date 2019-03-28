/**
 * API for common JUST CRUD
 */
const router = require('express').Router(),
    apiHelper = require('./adminAPIHelper'),
    auth = require('../../auth'),
    pool = require('../../../config/config'),
    formidable = require('formidable'),
    fse = require('fs-extra');

/**
 * get all from files table
 */
router.route('/admin/files').get(auth.required, (req, res, next) => {
    pool.query(
        "Select f.id, f.name, p.path, concat('/files/', p.path, '/', f.name) as path_to_add " +
            'From `paths` p ' +
            'INNER JOIN `files` f ON p.id = f.id_path',
        function(error, result) {
            if (error) return res.status(400).send(error);
            if (result.length == 0) {
                return res.sendStatus(204);
            } else {
                return res.send(result);
            }
        }
    );
});

/**
 * Add files
 */
router.post('/admin/upload_files/:path', auth.required, function(req, res, next) {
    let form = new formidable.IncomingForm(),
        files = {},
        fields = {};

    const path = req.params.path;

    pool.query('Select path from `paths` where id = ?', [path], function(error, result) {
        if (error) return res.status(400).send(error);

        dir = `../collegedubna/static/files/${result[0].path}`;

        form.keepExtensions = true;

        fse.ensureDir(dir, (err) => {
            console.log(err);
        });

        form.uploadDir = dir;

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
                return res.status(406).send(err);
            })
            .on('end', function() {
                pool.getConnection(function(err, con) {
                    if (err) {
                        return res.status(406).send(err);
                    }
                    con.query(
                        'Insert into `files` (id_path, name) values (?,?)',
                        [path, files.upload.name],
                        function(error, result) {
                            if (error) {
                                return res.status(406).send(error);
                            }
                            con.release();
                            res.send(result);
                        }
                    );
                });
            });
    });
});

/**
 * Delete files
 */
router.delete('/admin/upload_files/:id', auth.required, function(req, res, next) {
    const id = req.params.id;

    pool.query(
        "Select concat('/files/', p.path, '/', f.name) as path " +
            'From `paths` p ' +
            'INNER JOIN `files` f ON p.id = f.id_path ' +
            'where f.id = ?',
        id,
        (error, result) => {
            if (error) {
                console.log('error: ', error);
                return res.status(400).send(error);
            }
            if (result.length == 0) {
                return res.sendStatus(204);
            } else {
                fse.remove(`../collegedubna/static/${result[0].path}`)
                    .then(() => {
                        apiHelper.drop(res, 'files', { id: id });
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            }
        }
    );
});

module.exports = router;
