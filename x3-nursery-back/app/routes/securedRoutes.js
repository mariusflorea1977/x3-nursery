const healthSecuredEndPoints = require('./ws/health-secured-end-points.js');



module.exports = function (app) {
    healthSecuredEndPoints.registerRoutes(app);
};
