const fs = require('fs');

const paths = require('../path/paths');


module.exports = function getReduxModuleNames() {
    return fs.readdirSync(`${paths.base}${paths.redux}`);
};