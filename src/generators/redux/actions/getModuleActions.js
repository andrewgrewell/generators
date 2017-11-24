

module.exports = function getModuleActions(modulePath, reduxPath) {
    let templatePath = './redux/templates';
    return [
        {
            type: 'add',
            path: modulePath + 'index.js',
            templateFile: templatePath + '/moduleIndex.hjs',
            abortOnFail: true
        },
        {
            type: 'add',
            path: modulePath + '/{{ properCase name}}State.js',
            templateFile: templatePath + '/stateFile.hjs',
            abortOnFail: true
        },
        {
            type: 'add',
            path: modulePath + 'reducer.js',
            templateFile: templatePath + '/reducerFile.hjs',
            abortOnFail: true
        },
        {
            type: 'add',
            path: modulePath + 'actions.js',
            templateFile: templatePath + '/actionsFile.hjs',
            abortOnFail: true
        },
        {
            type: 'add',
            path: modulePath + '/name.js',
            templateFile: templatePath + '/nameFile.hjs',
            abortOnFail: true
        },
        {
            type: 'add',
            path: modulePath + '/selectors.js',
            templateFile: templatePath + '/selectorsFile.hjs',
            abortOnFail: true
        },
        {
            type: 'modify',
            path: reduxPath + '/index.js',
            pattern: /\/\*--GENERATOR INSERT MODULE IMPORT--\*\//,
            templateFile: './redux/templates/reduxModulesIndexImport.hjs',
            abortOnFail: true
        },
        {
            type: 'modify',
            path: reduxPath + '/index.js',
            pattern: /\/\*--GENERATOR INSERT MODULE EXPORT--\*\//,
            templateFile: './redux/templates/reduxModulesIndexExport.hjs',
            abortOnFail: true
        }
    ];
} ;