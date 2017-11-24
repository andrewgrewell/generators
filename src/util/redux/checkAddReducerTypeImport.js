const extractMatchesFromFile = require('../fs/extractMatchesFromFile');
const readFileContents = require('../fs/readFileContents');
const writeFile = require('../fs/writeFile');
const insertIntoString = require('../string/insertIntoString');
const getPositionInString = require('../string/getPositionInString');
const constantCase = require('../string/constantCase');

module.exports = function checkAddReducerTypeImport({ modulePath, pathToActionType, actionTypeName }) {
    // check in the reducer file for any import matching reducer
    let reducerPath = `${modulePath}/reducer.js`;
    let re = new RegExp(`'\\${pathToActionType}/actions[.js]*';`, 'g');
    let matches = extractMatchesFromFile(reducerPath, re);
    console.log('matches: ', reducerPath, re, matches);
    if (matches && matches.length) {
        // insert the import into the file
        let contents = readFileContents(reducerPath);
        let matchImportBlock = new RegExp(`(import {[\\s\\r\\n]+)([\\w,\\s]+)([\\s\\r\\n]+} from '${pathToActionType}\\/actions';)`);
        let updatedImport = `$1$2, ${constantCase(actionTypeName)}$3`;
        let updatedContents = contents.replace(matchImportBlock, updatedImport);
        writeFile(`${reducerPath}`, updatedContents);
        return true;
    }
    return false;
};