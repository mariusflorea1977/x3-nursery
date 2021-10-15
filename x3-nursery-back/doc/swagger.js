const appVersion = require('../package.json').version;
const conf = require('config');
const logger = require('../app/helpers/logger');
const microprofiles = require('../app/helpers/microprofiles.js');



module.exports.swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'X3 Nursery (X3-NURSERY) web-services directory',
        description: 'X3-NURSERY API documentation',
        version: appVersion
    },
    definitions: {},
    responses: {},
    parameters: {},
    tags: [],
    paths: {}
};

module.exports.setApiDef = function (apiPath /*string*/, apiDef /*object*/) {
    let apiDefObj;
    let httpVerb;
    for (let m of ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch']) {
        if (apiDef[m]) {
            httpVerb = m;
            apiDefObj = apiDef[m];
            break;
        }
    }

    if (! apiDefObj) {
        return;
    }

    if (microprofiles.check(httpVerb, apiPath)) {
        // Add "token" param. to "apiDef" if needed.
        if (apiPath.startsWith('/x3-nursery/api/secured/')) {
            if (! apiDefObj.parameters) {
                apiDefObj.parameters = [];
            }

            let tokenParam = apiDefObj.parameters.find(e => e.name === 'token');
            if (! tokenParam) {
                apiDefObj.parameters.push(
                    token = {
                        name: 'token',
                        description: 'JWT',
                        in: 'query',
                        required: false,
                        type: 'string'
                    }
                );
            }
        }

        // Add API def. to swagger ref..
        module.exports.swaggerDefinition.paths[apiPath] = apiDef;

        logger.info('... - End-point added: "' + Object.getOwnPropertyNames(apiDef)[0].toString().toUpperCase() + ' ' + apiPath + '".');
    }
};

