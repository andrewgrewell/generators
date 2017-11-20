const getPathRelative = require('../../../util/getPathRelative');

module.exports = function(modulePath, targetModule) {
    return [
        {
            type: 'modify',
            path: modulePath + '/reducer.js',
            pattern: /\/\*--GENERATOR INSERT ACTION TYPE--\*\//,
            templateFile: './redux/templates/reducerActionType.hjs',
            abortOnFail: true
        },
        {
            type: 'modify',
            path: modulePath + '/reducer.js',
            pattern: /\/\*--GENERATOR INSERT REDUCER--\*\//,
            templateFile: './redux/templates/reducer.hjs',
            abortOnFail: true
        },
    ];
};

function getPathToModule(modulePath) {

}