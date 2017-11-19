const chalk = require('chalk');

const hrSmall = createHr(16);
const hrMedium = createHr(32);
const hrLarge = createHr(60);

const indentSmall = createIndent(5);
const indentMedium = createIndent(12);
const indentLarge = createIndent(25);

function createIndent(length) {
    return createRepeatingString(length || 1, ' ');
}

function createHr(length) {
    return createRepeatingString(length || 1, '-');
}

function createRepeatingString(length, character) {
    return new Array(length).fill(character, 0, length).join('');
}

function createMasthead(message, color, indentation) {
    return chalk[color || 'white'](
        '\n' + hrLarge + '\n' +
        createIndent(indentation) + message + '\n'
        + hrLarge + '\n'
    );
}

function errorMessage(message) {
    return chalk.red('Error: ' + message);
}

function message(message, color) {
    color = color || 'white';
    return chalk[color](message);
}

module.exports = {
    createHr,
    createIndent,
    createMasthead,
    errorMessage,
    message,
    hrSmall,
    hrMedium,
    hrLarge,
    indentSmall,
    indentMedium,
    indentLarge
};