

module.exports = function(modulePath, templatePath) {
    return [
        {
            type: 'modify',
            path: modulePath + '/actions.js',
            pattern: /\/\*--\(DO NOT REMOVE\)generate action here\(DO NOT REMOVE\)--\*\//,
            templateFile: templatePath + '/action.hjs',
            abortOnFail: true
        },
    ];
};