/* eslint-disable no-var */
const getBasePath = require('../../util/getBasePath');
const validateInputProvider = require('../../util/validateInputProvider');
const validateInputName = require('../../util/validateInputName');
const gitAdd = require('../../util/gitAdd');
const paths = require('../../util/paths');
const getReduxModuleNames = require('../../util/getReduxModuleNames');
const whenTypeProvider = require('../../util/whenTypeProvider');
const parseStringList = require('../../util/parseStringList');

const getModuleActions = require('./actions/getModuleActions');
const getActionActions = require('./actions/getActionActions');



module.exports = {
    description: 'Redux Generators',
    prompts: [
        {
            type: 'list',
            name: 'type',
            message: 'What would you like to generate?',
            choices: ['module', 'action', 'selector', 'reducer']
        },
        // create module
        {
            when: whenTypeProvider('module'),
            type: 'input',
            name: 'name',
            message: 'What is the module name? (lowercase letters and spaces only)',
            validate: validateInputName
        },
        {
            when: (answers) => {
                let isModule = whenTypeProvider('module')(answers);
                let basePath = getBasePath();
                return isModule && !basePath;
            },
            type: 'directory',
            name: 'basePath',
            message: 'Base path not found. Please select your redux modules location. (you can also set jsgen: { root: [path] } in package.json',
            basePath: './'
        },
        // non module - select module to add to
        {
            when: (answers) => !whenTypeProvider('module')(answers),
            type: 'list',
            name: 'targetModule',
            choices: getReduxModuleNames(),
            message: ({ type }) => `Select which module to add the ${type} to.`
        },
        // action
        {
            when: whenTypeProvider('action'),
            type: 'input',
            name: 'actionName',
            message: 'What is the action name?',
            validate: validateInputName
        },
        {
            when: whenTypeProvider('action'),
            type: 'confirm',
            default: false,
            name: 'isAsync',
            message: 'Will it be an async action?'
        },
        {
            when: whenTypeProvider('action'),
            type: 'input',
            name: 'actionDescription',
            message: 'Action description'
        },
        {
            when: whenTypeProvider('action'),
            type: 'input',
            name: 'actionInput',
            message: 'Input arguments of the action'
        },
        {
            when: whenTypeProvider('action'),
            type: 'input',
            name: 'actionOutput',
            message: 'Return value of the action'
        },
        // selector
        {
            when: whenTypeProvider('selector'),
            type: 'input',
            name: 'selectorName',
            message: 'What is the module name? (lowercase letters and spaces only)',
            validate: validateInputName
        },
        // reducer
        {
            when: whenTypeProvider('reducer'),
            type: 'input',
            name: 'name',
            message: 'What is the module name? (lowercase letters and spaces only)',
            validate: validateInputName
        },
    ],
    actions: (data) => {
        let basePath = data.basePath || getBasePath();
        let reduxPath = basePath + paths.redux;
        let templatePath = './redux/templates';

        let actions = [];
        if (data.name) {
            // create module
            let modulePath = reduxPath + '/{{ dashCase name }}/';
            actions = getModuleActions(modulePath, templatePath);
        }
        else if (data.actionName) {
            // create action
            let modulePath = reduxPath + '/' + data.targetModule;
            data.actionInput = parseStringList(data.actionInput);
            console.log(data.actionInput);
            actions = getActionActions(modulePath, templatePath);
        }

        return actions.concat([gitAdd]);
    }
};