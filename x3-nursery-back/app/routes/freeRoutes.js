const appLastBuildDate = require('config').get('appLastBuildDate');
const appVersion = require('./../../package.json').version;
const swagger = require('../../doc/swagger');
const dbConnectionService = require('./../services/db-connection-service.js');
const jwtEndPoints = require('./ws/jwt-end-points.js');



module.exports = function (app) {
    let endPointPath = '';



    endPointPath = '/x3-nursery/api/free/health/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['Health - Free (no JWT required)'],
            summary: 'Heart beat',
            description: 'To be used in order to check if the back-end is up and can be reached.',
            operationId: 'getHealth',
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    });
    app.get(endPointPath, (req, res) => {
        res.status(200);
        res.json({result: 'OK'});
    });



    endPointPath = '/x3-nursery/api/free/dbhealth/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['DB Health - Free (no JWT required)'],
            summary: 'DB connexion heart beat',
            description: 'To be used in order to check if the back-end DB is up and can be reached.',
            operationId: 'getDbHealth',
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    });
    app.get(endPointPath, (req, res, next) => {
        dbConnectionService.checkDb(req, res, next);
    });



    endPointPath = '/x3-nursery/api/free/getLastBuildDate/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['App. last build date'],
            summary: 'Last build date.',
            description: 'Returns the last official build date of the back-end.',
            operationId: 'getLastBuildDate',
            produces: ['application/json'],
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    });
    app.get(endPointPath, function (req, res, next) {
        res.status(200);
        res.json({lastBuild: appLastBuildDate});
    });



    endPointPath = '/x3-nursery/api/free/getAppVer/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['App. version'],
            summary: 'Beck-end version.',
            description: 'Returns the current version of the back-end.',
            operationId: 'getAppVer',
            produces: ['application/json'],
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    });
    app.get(endPointPath, function (req, res, next) {
        res.status(200);
        res.json({applicationVersion: appVersion + '.' + appLastBuildDate});
    });



    jwtEndPoints.registerRoutes(app);
};
