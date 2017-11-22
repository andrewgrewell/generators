const getConfig = require('../getConfig');
const path = require('path');

module.exports = function getBasePath() {
    let config = getConfig();
    return path.resolve(process.cwd(), config.root);
};