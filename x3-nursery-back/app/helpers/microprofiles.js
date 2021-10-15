let microprofileV;
let microprofileUrlsV;
try {
    microprofileV = require('config').get('microprofile');
    microprofileUrlsV = require('../../microprofiles/' + microprofileV).urls;
} catch (e) {
    microprofileV = 'all';
    microprofileUrlsV = [];
}
const microprofile = microprofileV;
const microprofileUrls = microprofileUrlsV;



module.exports = {
    microprofile: microprofile,

    check: function(httpVerb, url) {
        return (
            (microprofile.toLowerCase() === 'all')
            ||
            (microprofileUrls.indexOf(httpVerb.toUpperCase() + ' ' + url) !== -1)
        );
    }
};
