const conf = require('config');
const dbConfig = conf.dbConfig;



console.log();
console.log("DB config: " + JSON.stringify(dbConfig, null, '    '));

module.exports = require('knex')(dbConfig);
