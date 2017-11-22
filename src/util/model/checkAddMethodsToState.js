const extractMatchesFromString = require('../string/extractMatchesFromString');
const readFileContents = require('../fs/readFileContents');
const properCase = require('../string/properCase');
const parseStringList = require('../string/parseStringList');
const upperFirst = require('../string/upperFirst');
const lowerFirst = require('../string/lowerFirst');
const getPositionInString = require('../string/getPositionInString');
const insertIntoString = require('../string/insertIntoString');
const writeFile = require('../fs/writeFile');


module.exports = function(targetModule, modulePath, calls) {
    return new Promise((resolve, reject) => {
        let stateName = properCase(targetModule.replace('-', ' ')) + 'State';
        let statePath = `${modulePath}/${stateName}.js`;
        let stateContents = readFileContents(statePath);
        // extract the .method(arguments) from the reducer body
        // for each call check if the method exists on the model, if not add it
        calls.reverse().forEach(([accessor, property, args]) => {
            let method = stringifyMethod(property, accessor, args);
            let writePosition = getWritePositionInModel(stateContents);
            if (methodExists(property, accessor, stateContents)) {
                return;
            }
            stateContents = insertIntoString(stateContents, writePosition, method);
        });
        writeFile(`${modulePath}/${stateName}.js`, stateContents);
        resolve();
    });
};

function getWritePositionInModel(stateContents) {
    let insertRegex = /[\w\n\r;{}\s='\/.]*class \w+ extends \w+ {\n.*constructor.*\n.*\n.*}\n|class \w+ extends \w+ {/;
    return getPositionInString(stateContents, insertRegex);
}

function stringifyMethod(property, accessorType, args) {
    let methodName = accessorType + upperFirst(property);
    let accessorString;

    if (accessorType === 'set') {
        accessorString = `this.set('${lowerFirst(property)}', ${args})`;
    }
    else {
        accessorString = `this.${lowerFirst(property)}`;
    }
    return `\n\t${methodName}(${args}) {\n\t\treturn ${accessorString};\n\t}\n`;
}

function methodExists(property, accessorType, stateContents) {
    let methodName = accessorType + upperFirst(property);
    let regex = new RegExp(methodName, 'g');
    return regex.test(stateContents);
}