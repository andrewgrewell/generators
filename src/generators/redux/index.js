/* eslint-disable no-var */
const getBasePath = require('../../util/getBasePath');
const validateInputProvider = require('../../util/validateInputProvider');
const validateInputName = require('../../util/validateInputName');
const gitAdd = require('../../util/gitAdd');
const paths = require('../../util/paths');
const getReduxModuleNames = require('../../util/getReduxModuleNames');
const whenTypeProvider = require('../../util/whenTypeProvider');
const parseStringList = require('../../util/parseStringList');
const constantCase = require('../../util/constantCase');

const getModuleActions = require('./actions/getModuleActions');
const getActionActions = require('./actions/getActionActions');
const getReducerActions = require('./actions/getReducerActions');



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
            message: 'Input arguments of the action (comma separated list)'
        },
        {
            when: whenTypeProvider('action'),
            type: 'confirm',
            default: false,
            name: 'createReducer',
            message: 'Would you like to create a reducer for this action?'
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
            name: 'actionName',
            message: 'What is the action name?',
            validate: validateInputName
        },
        {
            when: (answers) => {
                let actionReducer = whenTypeProvider('action')(answers) && answers.createReducer;
                return actionReducer || whenTypeProvider('reducer')(answers);
            },
            type: 'list',
            choices: (answers) => {
                let actionType = constantCase(answers.actionName);
                return [
                    actionType,
                    `${actionType} (SUCCESS)`,
                    `${actionType} (FAILURE)`
                ];
            },
            name: 'reducerActionType',
            message: 'Select the action type for the reducer'
        },
        {
            when: (answers) => {
                let actionReducer = whenTypeProvider('action')(answers) && answers.createReducer;
                return actionReducer || whenTypeProvider('reducer')(answers);
            },
            type: 'editor',
            name: 'reducerBody',
            message: 'Open editor and enter the body of the reducer (e.g. return state.setValue(foo))'
        },
    ],
    actions: (data) => {
        let basePath = data.basePath || getBasePath();
        let reduxPath = basePath + paths.redux;
        let modulePath;

        let actions = [];
        if (data.name) {
            // create module
            modulePath = reduxPath + '/{{ dashCase name }}/';
            actions = getModuleActions(modulePath);
        }
        else if (data.actionName) {
            // create action
            modulePath = reduxPath + '/' + data.targetModule;
            data.actionInput = parseStringList(data.actionInput);
            actions = getActionActions(modulePath);
        }

        if (data.reducerActionType != null) {
            if (data.reducerActionType.includes('SUCCESS')) {
                data.reducerActionType = `successActionType(${constantCase(data.actionName)})`;
            }
            else if (data.reducerActionType.includes('FAILURE')) {
                data.reducerActionType = `failureActionType(${constantCase(data.actionName)})`;
            }
            data.reducerBody = `${data.reducerBody}`;
            actions = actions.concat(getReducerActions(modulePath));
        }

        return actions.concat([gitAdd]);
    }
};