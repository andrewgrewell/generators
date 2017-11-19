/* eslint-disable no-var */
const validateInputProvider = require('../../util/validateInputProvider');
const gitAdd = require('../../util/gitAdd');


module.exports = {
    description: 'Generator prompt here',
    prompts: [
        // {
        //     type: 'input',
        //     name: 'name',
        //     message: 'What is the module name? (lowercase letters and spaces only)',
        //     validate: validateInputProvider('Module name required', (moduleName) => {
        //         if (/[^a-z\s]/.test(moduleName)) {
        //             return {
        //                 hasError: true,
        //                 errorMessage: 'only lowercase letters and spaces'
        //             };
        //         }
        //         return true;
        //     })
        // }
    ],
    actions: (data) => {
        // var actions = [
        //     {
        //         type: 'add',
        //         path: modulePath + 'index.js',
        //         templateFile: './module/templates/moduleIndex.hjs',
        //         abortOnFail: true
        //     }
        // ];
        return [] //actions.concat([gitAdd]);
    }
};