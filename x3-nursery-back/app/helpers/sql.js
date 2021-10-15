const fs = require('fs');



module.exports.sqlCommands = {};

(function init() {
    fs.readdirSync('./sql/commands').forEach(fileName => {
        let fileContents = fs.readFileSync('./sql/commands/' + fileName, 'utf8');
        while (fileContents.indexOf() > -1) {
            fileContents = fileContents.replace('\n\n\n', '\n\n');
        }
        fileContents.split('\n\n').forEach(entry => {
            let p = entry.indexOf('\n');
            if (p > -1) {
                let key = entry.substring(0, p);
                let val = entry.substring(p + 1, entry.length);
                module.exports.sqlCommands[key] = val;
            }
        });
    });
})();

module.exports.getCommand = sqlCommandId => {
    if (Object.keys(module.exports.sqlCommands).length === 0) { // Init << sqlCommands >> (just in case... (normally, the automatic initialization has already been performed on module "inclusion")).
        module.exports.init();
    }

    let sqlCommand = module.exports.sqlCommands[sqlCommandId];
    if (! sqlCommand) {
        sqlCommand = '';
    }

    return sqlCommand.replace('\n', ' ');
};
