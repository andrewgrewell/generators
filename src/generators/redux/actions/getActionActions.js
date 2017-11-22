

module.exports = function(modulePath) {
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