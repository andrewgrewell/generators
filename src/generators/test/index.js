/* eslint-disable no-var */
const validateInputName = require('../../util/validation/validateInputName');
const getDirectoryFiles = require('../../util/fs/getDirectoryFiles');
const getPaths = require('../../util/path/getPaths');
const getPathRelative = require('../../util/path/getPathRelative');
const getBasePath = require('../../util/path/getBasePath');
const readFileContents = require('../../util/fs/readFileContents');
const extractMatchesFromFile = require('../../util/fs/extractMatchesFromFile');
const properCase = require('../../util/string/properCase');
const gitAdd = require('../../util/gitAdd');


module.exports = {
    description: 'Jest Test Generator',
    prompts: [
        {
            type: 'directory',
            name: 'basePath',
            message: 'Select the directory of the module to test',
            basePath: getBasePath()
        },
        {
            type: 'list',
            name: 'fileName',
            message: 'Select the file that will be tested',
            choices: ({ basePath }) => {
                return [
                    {
                        name: 'Create new file',
                        value: 'custom'
                    },
                    ...getDirectoryFiles(basePath).map((file) => ({
                       name: file
                    }))
                ];
            }
        },
        {
            when: ({ fileName }) => fileName === 'custom',
            type: 'input',
            name: 'customFileName',
            message: 'What is the file name? (excluding file extension)',
            validate: validateInputName
        }
    ],
    actions: (data) => {
        let actions = [];
        let { basePath, fileName, customFileName } = data;
        let testFilePath = `${basePath}/__tests__`;
        data.mockStorePath = getPathRelative(testFilePath, getPaths().mockStore);
        if (customFileName) {
            testFilePath += `/${properCase(customFileName)}.js`;
        }
        else {
            let filePath = `${basePath}/${fileName}`;
            let fileContents = readFileContents(filePath);
            testFilePath += `/${fileName}`;
            data.testName = buildTestName(filePath);

            if (isActionFile(fileContents) || fileName === 'actions.js') {
                data.existingActionNames = extractMatchesFromFile(filePath, /export function (\w+)\(.*\)/gim);
                console.log('existing action names: ', data.existingActionNames);
                actions = [
                    {
                        type: 'add',
                        path: testFilePath,
                        templateFile: './test/templates/actionTest.hjs',
                        abortOnFail: true
                    }
                ];
            }
            else if (isReducerFile(fileContents) || fileName === 'reducer.js') {
                console.log('--- file is reducer');
            }
            else if (isConnectedComponentFile(fileContents)) {
                console.log('--- file is connected component');
            }
            else if (isStatelessComponentFile(fileContents)) {
                console.log('--- file is stateless component');
            }
            else if (isStatefulComponentFile(fileContents)) {
                console.log('--- file is stateful component');
            }
            else {
                console.log('--- file is unknown');
            }

        }
        return actions.concat([gitAdd]);
    }
};

function isActionFile(contents) {
    return /@returns { \w+ } - redux action/gmi.test(contents);
}

function isReducerFile(contents) {
    return /handleActions({\.*})/gmi.test(contents);
}

function isStatelessComponentFile(contents) {
    return /const \w+ = \(props\) =>/gmi.test(contents);
}

function isStatefulComponentFile(contents) {
    return /const \w+ = createReactClass\({/gmi.test(contents)
        || /class \w+ extends/gmi.test(contents);
}

function isConnectedComponentFile(contents) {
    return /export default connectComponent\(\w+\)/gmi.test(contents);
}

function buildTestName(filePath) {
    let parts = filePath.split('/');
    return `${parts[parts.length - 2]}/${parts[parts.length -1]}`;
}