const childProcess = require('child_process');



module.exports.examples = {};

/**
 * Call   =>   << require('./app/helpers/utils').examples.runExamples(); >>
 */
module.exports.examples.runExamples = () => {
    module.exports.examples.execJsSourceCode();
    module.exports.examples.execJsSourceCodeAsCoreOfAFunction();

    module.exports.examples.execShellCommand();
};



module.exports.execJsSourceCode = source => {
    try {
        return eval(source);
    } catch (e) {
        return e;
    }
};
module.exports.examples.execJsSourceCode = () => {
    let s1 = `
        let result = null;
        console.log('Hello World !...');
        result = Math.PI;
        result;   //   =>   Note the missing of << return >> key-word here.
    `;
    let s2 = `
        let result = null;
        console.log('Hello World !...');
        throw new Error('Test error');
        result;   //   =>   Note the missing of << return >> key-word here.
    `;
    console.log();
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execJsSourceCode() >> - Source with no error...");
    console.log("Result: " + module.exports.execJsSourceCode(s1));
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execJsSourceCode() >> - Source with error...");
    console.log("Result: " + module.exports.execJsSourceCode(s2));
    console.log("====================================================================================================");
};

module.exports.execJsSourceCodeAsCoreOfAFunction = source => {
    try {
        return (new Function(source))();
    } catch (e) {
        return e;
    }
};
module.exports.examples.execJsSourceCodeAsCoreOfAFunction = () => {
    let s1 = `
        console.log('Hello World !...');
        return Math.E;   //   =>   Note the << return >> instruction here.
    `;
    let s2 = `
        console.log('Hello World !...');
        throw new Error('Test error');
    `;
    console.log();
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execJsSourceCodeAsCoreOfAFunction() >> - Source with no error...");
    console.log("Result: " + module.exports.execJsSourceCodeAsCoreOfAFunction(s1));
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execJsSourceCodeAsCoreOfAFunction() >> - Source with error...");
    console.log("Result: " + module.exports.execJsSourceCodeAsCoreOfAFunction(s2));
    console.log("====================================================================================================");
};



/**
 * Execute shell command synchronously and return the console output.
 * @return Console output.
 * */
module.exports.execShellCommand = command => {
    try {
        return childProcess.execSync(command).toString();
    } catch (e) {
        return e.toString();
    }
};
module.exports.examples.execShellCommand = () => {
    let s1 = 'ls -la';
    let s2 = 'l_s -la';
    console.log();
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execShellCommand() >> - Command with no error...");
    console.log(module.exports.execShellCommand(s1));
    console.log("====================================================================================================");
    console.log("Call of << utils.examples.execShellCommand() >> - Command with error...");
    console.log(module.exports.execShellCommand(s2));
    console.log("====================================================================================================");
};
