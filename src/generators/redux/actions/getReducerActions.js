const getPathRelative = require('../../../util/path/getPathRelative');

module.exports = function(modulePath, skipImport) {
    let reducerAction = {
        type: 'modify',
        path: modulePath + '/reducer.js',
        pattern: /\/\*--GENERATOR INSERT REDUCER--\*\//,
        templateFile: './redux/templates/reducer.hjs',
        abortOnFail: true
    };

    if (skipImport) {
        return [reducerAction];
    }

    return [
        reducerAction,
        {
            type: 'modify',
            path: modulePath + '/reducer.js',
            pattern: /\/\*--GENERATOR INSERT ACTION TYPE--\*\//,
            templateFile: './redux/templates/reducerActionType.hjs',
            abortOnFail: true
        },
    ];
};