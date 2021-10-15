const swagger = require('../../../doc/swagger');
const jwtService = require('../../services/jwt-service');



module.exports.registerRoutes = function (app) {
    let endPointPath = '';

    endPointPath = '/x3-nursery/api/free/jwt/get/1.0';
    swagger.setApiDef(endPointPath, {
        get: {
            tags: ['JWT - Check security info. and generate JWT'],
            summary: 'Generate and return JWT',
            description: 'To be used in order to check user\'s password and generate a JWT.',
            operationId: 'getJwt',
            parameters: [
                {
                    name: 'user',
                    description: 'User id',
                    in: 'query',
                    required: true,
                    type: 'string'
                },
                {
                    name: 'pwd',
                    description: 'Password',
                    in: 'query',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    });
    app.get(endPointPath, (req, res) => {
        res.status(200);
        res.json(jwtService.getNewJwt(req.query.user, req.query.pwd));
    });
};
