const conf = require('config');
const logger = require('./logger');
const knex = require('./knex');
const sql = require('./sql');


if (conf.checkDbOnAppStart) {
    knex.raw(sql.getCommand('get_current_schema_version'))
        .then(r => {
            if (r.rowCount === 0) {
                logger.error('No DB schema version definition found   =>   The application will end.');
                process.exit(1);
            }

            if (r.rowCount > 1) {
                logger.error('More than one schema version definitions found (' + r.rowCount + ' schema version definitions found)   =>   The application will end.');
                process.exit(1);
            }

            // Info.: Here: << r.rowCount === 1 >>

            if (conf.supportedDbSchemaVersion !== r.rows[0].schema_version) {
                logger.error('The expected schema version is ' + conf.supportedDbSchemaVersion + ' while ' + r.rows[0].schema_version + ' found into the DB   =>   The application will end.');
                process.exit(1);
            }

            logger.info('DB schema version check: OK (expected = found = ' + r.rows[0].schema_version + ').');
        })
        .catch(
            err => {
                logger.error('No DB schema version definition found   =>   ' + err.message + '   =>   The application will end.');
                process.exit(1);
            }
        );
}
