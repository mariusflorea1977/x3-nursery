const conf = require('config');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const logger = require('./app/helpers/logger');
const cors = require('cors');
const freeRoutes = require('./app/routes/freeRoutes');
const securedRoutes = require('./app/routes/securedRoutes');
const swagger = require('./doc/swagger');
const swaggerUi = require('swagger-ui-express');
const errorMiddleware = require('./app/middleware/errorMiddleware');
const sql = require('./app/helpers/sql');
require('./app/helpers/db-schema');   //   <=   Check the connection to the DB the DB-schema version.
const microprofiles = require('./app/helpers/microprofiles');
const text = require('./app/helpers/text');

const app = express();



// Set server listening port.
if (process.env.PORT === undefined) {
    process.env.PORT = conf.defaultPort;
}

// Middleware: Enable request detail logging.
app.use(
    (req, res, next) => {
        if (conf.rest.logRestRequestsEntries === true) {
            let rawHeaders = JSON.stringify(req.rawHeaders, null, '        ');
            if (rawHeaders) {rawHeaders = rawHeaders.replace('\n]', '\n    ]');}

            let headers = JSON.stringify(req.headers, null, '        ');
            if (headers) {headers = headers.replace('\n}', '\n    }');}

            let params = JSON.stringify(req.params, null, '        ');
            if (params) {params = params.replace('\n}', '\n    }');}

            let query = JSON.stringify(req.query, null, '        ');
            if (query) {query = query.replace('\n}', '\n    }');}

            let body = JSON.stringify(req.body, null, '        ');
            if (body) {body = body.replace('\n}', '\n    }');}

            logger.info(
                '\n'
                + '• Incoming REST query:\n'
                + '    • Method: ' + req.method + '\n'
                + '    • Original URL: ' + JSON.stringify(req.originalUrl) + '\n'
                + '    • Raw headers: ' + rawHeaders + '\n'
                + '    • Headers: ' + headers + '\n'
                + '    • Params: ' + params + '\n'
                + '    • Query: ' + query + '\n'
                + '    • Body: ' + body + '\n'
                + '\n'
            );
        }

        next();
    }
);

// Middleware: Enable cors requests.
let corsOptions = {
    exposedHeaders: ['X-Total-Count'] // Voir ici pour plus d'info.: https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
};
app.use(cors(corsOptions));

// Middleware: JWT security filter.
// IMPORTANT: A secured end-point is an end-point having << /x3-nursery/api/secured >> as base-URL.
app.use(
    "/x3-nursery/api/secured",
    (req, res, next) => {
        if (! conf.devMode) {
            let authHeader = req.headers.Authorization;
            let queryToken = req.query.token;
            if (! authHeader) {
                if (! queryToken) {
                    throw {
                        name: 'UnauthorizedError',
                        message: 'No authorization token was found',
                        code: 'unauthorized',
                        status: 401
                    };
                }
            }

            let token = (authHeader ? (authHeader.split(' ')[1]) : queryToken);
            jsonwebtoken.verify(token, conf.security.jwt.accessTokenSecret, (err, jwtLoad) => {
                if (err) {
                    throw {
                        name: 'AccessDeniedError',
                        message: 'Access denied: Token check error: ' + err.message,
                        code: 'access_denied',
                        status: 403
                    };
                }

                // Keep JWT info. into the request.
                req.jwtLoad = jwtLoad;

                next();
            });
        }

        next();
    }
);

{
    let s = '* Used microprofile: ' + microprofiles.microprofile + ' *';
    let f = '-'.repeat(s.length);
    logger.info();
    logger.info(f);
    logger.info(s);
    logger.info(f);
}

// Free (non-secured) end-points.
logger.info();
logger.info('Exposed free (non-secured) end-points:');
logger.info('======================================');
freeRoutes(app);

// Secured end-points.
logger.info();
logger.info('Exposed secured end-points:');
logger.info('===========================');
securedRoutes(app);

// Serve Swagger.
app.use(conf.swaggerBaseUrl, swaggerUi.serve, swaggerUi.setup(swagger.swaggerDefinition, {explorer: true}));

// Middleware: Error handler
app.use(errorMiddleware.logHandler); // Error logger (to log target (console, file, etc....)).
app.use(errorMiddleware.errorHandler); // Error sender (to the HTTP client).

// Creating and launching HTTP server.
const serverHttp = require('http').createServer(app);
serverHttp.listen(process.env.PORT, function () {
    logger.info();
    logger.info('App. instance info.:');
    logger.info('===================');
    logger.info(
        (
            '... - Running on env. "' + ((process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : 'default') + '".'
            + '\n' +
            '... - Swagger is served at base URL "' + conf.swaggerBaseUrl + '".'
            + '\n' +
            '... - Listening on port ' + process.env.PORT + '.'
            + '\n' +
            '... - REST requests entries logging: ' + ((conf.rest.logRestRequestsEntries === true) ? 'ON' : 'OFF') + '.'
            + "\n" +
            '... - SQL commands loaded (key:SQL):'
            + "\n" +
            Object.keys(sql.sqlCommands).reduce(
                (accumulator, currentValue) => {
                    return (
                        accumulator + '... ... - Associated to key   "' + currentValue + '":'
                        + '\n          <<\n' +
                        '              ' + sql.sqlCommands[currentValue].replace(/\n+$/, '').replace('\n', '\n              ')
                        + "\n          >>\n"
                    ).replace('\n\n>>', '\n>>');
                },
                ''
            )
            + "\n" +
            '... - Params. real values: '
            +
            JSON.stringify(conf, null, '    ').replace(/\n/g, '\n    ')
            + "\n"
        ).replace(/\n\n$/, '\n')
    );
});

module.exports = app;
