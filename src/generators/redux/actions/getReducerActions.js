const getPathRelative = require('../../../util/path/getPathRelative');

module.exports = function(modulePath, skipImport) {
    let importAction = {
        type: 'modify',
        path: modulePath + '/reducer.js',
        pattern: /\/\*--GENERATOR INSERT REDUCER--\*\//,
        templateFile: './redux/templates/reducer.hjs',
        abortOnFail: true
    };

    if (skipImport) {
        return [importAction];
    }

    return [
        importAction,
        {
            type: 'modify',
            path: modulePath + '/reducer.js',
            pattern: /\/\*--GENERATOR INSERT ACTION TYPE--\*\//,
            templateFile: './redux/templates/reducerActionType.hjs',
            abortOnFail: true
        },
    ];
};