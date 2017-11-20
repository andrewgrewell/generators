const fs = require('fs');

const extractMatchesFromFile = require('./extractMatchesFromFile');
const paths = require('./paths');


module.exports = function getReduxModuleActionTypes(moduleName) {
    return extractMatchesFromFile(
        `${paths.base}${paths.redux}/${moduleName}/actions.js`,
        /export const ([A-Z_0-9]+) = `.*[A-Z_0-9]+`;/g
    );
};