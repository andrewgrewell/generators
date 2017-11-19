const fs = require('fs');

const paths = require('./paths');


module.exports = function getReduxModuleNames() {
    return fs.readdirSync(`${paths.base}${paths.redux}`);
};