function stdLog(msg /*string*/) {
    console.log((msg ? msg : ""));
}
function stdErrLog(msg /*string*/) {
    // console.error(msg ? msg : "");
console.log(msg ? ('Error: ' + msg) : "");
}

module.exports = {
    info: stdLog,
    debug: stdLog,
    warn: stdLog,
    trace: stdLog,
    error: stdErrLog
};
