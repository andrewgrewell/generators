/* eslint-disable no-var */
const zip = require('lodash.zip');
const getBasePath = require('../../util/path/getBasePath');
const validateInputProvider = require('../../util/validation/validateInputProvider');
const validateInputName = require('../../util/validation/validateInputName');
const gitAdd = require('../../util/gitAdd');
const paths = require('../../util/path/paths');
const getReduxModuleNames = require('../../util/redux/getReduxModuleNames');
const getReduxModuleActionTypes = require('../../util/redux/getReduxModuleActionTypes');
const whenTypeProvider = require('../../util/whenTypeProvider');
const parseStringList = require('../../util/string/parseStringList');
const constantCase = require('../../util/string/constantCase');
const dashCase = require('../../util/string/dashCase');
const camelCase = require('../../util/string/camelCase');
const getPathRelative = require('../../util/path/getPathRelative');
const checkAddMethodsToState = require('../../util/model/checkAddMethodsToState');
const fileExists = require('../../util/fs/fileExists');
const extractMatchesFromFile = require('../../util/fs/extractMatchesFromFile');
const extractMatchesFromString = require('../../util/string/extractMatchesFromString');

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
            choices: ['module', 'action', 'reducer']
        },
        {
            when: () => !getBasePath(),
            type: 'directory',
            name: 'basePath',
            message: 'Base path not found. Please select your redux modules location. (you can also set jsgen: { root: [path] } in package.json',
            basePath: './'
        },
        // create module
        {
            when: whenTypeProvider('module'),
            type: 'input',
            name: 'name',
            message: 'What is the module name? (lowercase letters and spaces only)',
            validate: (name, answers) => {
                let { reduxPath } = getPaths(answers);
                let exists = fileExists(`${reduxPath}/${dashCase(name)}`);
                return exists ? 'Module already exists.' : validateInputName(name);
            }
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
            validate: (actionName, answers) => {
                let { modulePath } = getPaths(answers);
                let actionRegex = new RegExp(`export [\\w]+ (${camelCase(actionName)})`, 'g');
                let matches = extractMatchesFromFile(`${modulePath}/actions.js`, actionRegex);
                return matches && matches.length ? 'Action already exits' : validateInputName(actionName);
            }
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
        // reducer
        {
            when: whenTypeProvider('reducer'),
            type: 'list',
            name: 'fromModule',
            choices: getReduxModuleNames(),
            default: (answers) => answers.targetModule,
            message: 'Import the action type from which module?',
        },
        {
            when: whenTypeProvider('reducer'),
            type: 'list',
            name: 'reducerActionName',
            choices: (answers) => {
                let choices = getReduxModuleActionTypes(answers.fromModule);
                if (!choices.length) {
                    throw new Error(`No action types exist for module: ${answers.fromModule}. Did you forget to create the action?`)
                }
                return choices;
            },
            message: 'Select the modules action type'
        },
        {
            when: (answers) => {
                let actionReducer = whenTypeProvider('action')(answers) && answers.createReducer;
                return actionReducer || whenTypeProvider('reducer')(answers);
            },
            type: 'list',
            name: 'reducerActionType',
            choices: (answers) => {
                let actionType = constantCase(answers.reducerActionName || answers.actionName);
                return [
                    actionType,
                    `${actionType} (SUCCESS)`,
                    `${actionType} (FAILURE)`
                ];
            },
            message: 'Select the action type variation for the reducer'
        },
        {
            when: (answers) => {
                // need to validate the previous answers here since list doesn't provide validate
                validateActionType(answers);
                let actionReducer = whenTypeProvider('action')(answers) && answers.createReducer;
                return actionReducer || whenTypeProvider('reducer')(answers);
            },
            type: 'editor',
            name: 'reducerBody',
            message: 'Open editor and enter the body of the reducer (e.g. return state.setValue(foo))'
        },
    ],
    actions: (data) => {
        let { basePath, reduxPath, modulePath } = getPaths(data);

        let actions = [];
        if (data.name) {
            // create module
            modulePath = reduxPath + '/{{ dashCase name }}/';
            actions = getModuleActions(modulePath, reduxPath);
        }
        else if (data.actionName) {
            // create action
            data.actionInput = parseStringList(data.actionInput);
            actions = getActionActions(modulePath);
        }

        // if we are creating a reducer
        if (data.reducerActionType != null) {
            data.actionName = data.actionName || data.reducerActionName;
            // update the action type to include the wrapper for success/failure actions
            // this assumes the client project has the referenced helpers
            if (data.reducerActionType.includes('SUCCESS')) {
                data.reducerActionType = `successActionType(${constantCase(data.actionName)})`;
            }
            else if (data.reducerActionType.includes('FAILURE')) {
                data.reducerActionType = `failureActionType(${constantCase(data.actionName)})`;
            }

            // convert action type import to a relative path for use in the template
            if (!data.fromModule) {
                data.reducerImportPath = '.';
            }
            else {
                data.reducerImportPath = getPathRelative(modulePath, `${reduxPath}/${data.fromModule}`);
                if (!data.reducerImportPath.length) {
                    data.reducerImportPath = '.';
                }
            }

            // the reducer body comes back with a new line at the end every time
            // TODO: verify this isn't editor specific (vim in my case)
            data.reducerBody = data.reducerBody.slice(0, data.reducerBody.length - 1);

            // check the methods in the reducer body exist in state, if not add them
            let calls = extractMatchesFromString(data.reducerBody, /\.([a-z]+)(\w+)\(([a-zA-Z0-9,\s]+)\)/g);
            checkAddMethodsToState(data.targetModule, modulePath, calls);
            data.payloadBody = getReducerPayload(calls);
            actions = actions.concat(getReducerActions(modulePath));
        }

        return actions.concat([gitAdd]);
    }
};

function getReducerPayload(calls) {
    let args = calls.reduce((result, call) => {
        // calls is an array in the form [accessor, name, args]
        let args = call[2];
        if (args) {
            return result.concat(parseStringList(args));
        }
        return result;
    }, []);
    if (args && args.length) {
        return `{ ${args.reverse().join(', ')} }`;
    }

    return null;
}

function validateActionType(answers) {
    //check if that action type is in the file already
    if (!answers.reducerActionType) {
        return;
    }
    let { modulePath } = getPaths(answers);
    let actionTypeRegex = new RegExp(`(${answers.reducerActionType.split(' ')[0]})`, 'g');
    let matches = extractMatchesFromFile(`${modulePath}/reducer.js`, actionTypeRegex);
    if (matches && matches.length) {
        throw new Error('Action type already present in reducer');
    }
}

function getPaths(data) {
    let basePath = data.basePath || getBasePath();
    let reduxPath = basePath + paths.redux;
    let modulePath = reduxPath + '/' + data.targetModule;
    return {
        basePath,
        reduxPath,
        modulePath
    };
}