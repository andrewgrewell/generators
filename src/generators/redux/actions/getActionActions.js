

module.exports = function(modulePath, templatePath) {
    return [
        {
            type: 'modify',
            path: modulePath + '/actions.js',
            pattern: /\/\*--GENERATOR INSERT ACTION--\*\//,
            templateFile: './redux/templates/action.hjs',
            abortOnFail: true
        },
    ];
};