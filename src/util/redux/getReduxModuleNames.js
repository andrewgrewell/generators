const fs = require('fs');

const paths = require('../path/paths');


module.exports = function getReduxModuleNames() {
    let files = fs.readdirSync(`${paths.base}${paths.redux}`);
    return files.filter(fileName => !/\./.test(fileName));
};