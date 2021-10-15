const swagger = require('../../../doc/swagger');
const jwtService = require('../../services/jwt-service');



module.exports.registerRoutes = function (app) {
    let endPointPath = '';

    endPointPath = '/x3-nursery/api/secured/health/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['Health - Secured (JWT required)'],
            summary: 'Heart beat with JWT security',
            description: 'To be used in order to check if the back-end is up and secured routes can be reached.',
            operationId: 'getSecuredHealth',
            responses: {
                "200": {
                    description: 'JWT info.'
                }
            }
        }
    });
    app.get(endPointPath, (req, res) => {
        res.status(200);
        res.json(jwtService.getJwtInfo(req));
    });
};
