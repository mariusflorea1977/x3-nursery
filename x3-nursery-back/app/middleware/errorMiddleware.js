const logger = require('../helpers/logger');
const httpStatus = require('http-status-codes');



/**
 * Error logger (to log target (console, file, etc....)).
 */
exports.logHandler = function (err, req, res, next) {
    return logHandler(err, req, res, next)
};

function logHandler(err, req, res, next) {
    logger.error(JSON.stringify(err, null, '    '));

    next(err);
}



/**
 * Error sender (to the HTTP client).
 */
exports.errorHandler = function (err, req, res, next) {
    return errorHandler(err, req, res, next)
};

function errorHandler(err, req, res, next) {
    if (! err.status) {
        err.status = 500;
    }

    res.status(err.status);
    res.json(err);
}
