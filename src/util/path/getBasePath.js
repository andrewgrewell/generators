const getConfig = require('../getConfig');
const path = require('path');

module.exports = function getBasePath() {
    let config = getConfig();
    config.paths = config.paths || {};
    return path.resolve(process.cwd(), config.paths.src);
};