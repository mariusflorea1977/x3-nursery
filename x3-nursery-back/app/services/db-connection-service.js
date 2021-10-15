const conf = require('config');
const knex = require('./../helpers/knex');
const sql = require('./../helpers/sql');



module.exports = {
    checkDb: (req, res, next) => {
        knex.raw(sql.getCommand('get_current_schema_version'))
            .then(r => {
                if (r.rowCount === 0) {
                    next({
                        name: 'DBError',
                        message: 'DB schema version not found',
                        code: 'DB_access_error',
                    });

                    return;
                }

                if (r.rowCount > 1) {
                    next({
                        name: 'DBError',
                        message: 'More than one schema version definitions found (' + r.rowCount + ' schema version definitions found)',
                        code: 'DB_access_error',
                    });

                    return;
                }

                // Info.: Here: << r.rowCount === 1 >>

                if (! r.rows[0]) {
                    next({
                        name: 'DBError',
                        message: 'DB schema version not found',
                        code: 'DB_access_error',
                    });

                    return;
                }

                if (conf.supportedDbSchemaVersion !== r.rows[0].schema_version) {
                    next({
                        name: 'DBError',
                        message: 'The expected schema version is ' + conf.supportedDbSchemaVersion + ' while ' + r.rows[0].schema_version + ' found into the DB',
                        code: 'DB_access_error',
                    });

                    return;
                }

                res.status(200);
                res.json({result: 'OK'});
            })
            .catch(err => {
                if (err.code === '42P01') {
                    next({
                        name: 'DBAccessError',
                        message: 'DB schema version table ("schema_version") not found',
                        code: 'DB_access_error',
                    });
                } else {
                    next({
                        name: 'DBAccessError',
                        message: (
                            err.stack
                            ?
                            err.stack
                                .replace('\r', '')
                                .substr(0, err.stack.indexOf('\n'))
                            :
                            'DB access error'
                        ),
                        code: 'DB_access_error',
                    });
                }
            });
    }
};
