const getConfig = require('../getConfig');

module.exports = function getPaths() {
    let config = getConfig();
    return config.paths || {
        src: './'
    };
};