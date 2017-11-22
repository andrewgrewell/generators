const fs = require('fs');

const extractMatchesFromFile = require('../fs/extractMatchesFromFile');
const paths = require('../path/paths');


module.exports = function getReduxModuleActionTypes(moduleName) {
    return extractMatchesFromFile(
        `${paths.base}${paths.redux}/${moduleName}/actions.js`,
        /export const ([A-Z_0-9]+) = `.*[A-Z_0-9]+`;/g
    );
};