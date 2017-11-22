const upperFirst = require('./upperFirst');


module.exports = function properCase(string) {
    let parts = string.split(' ');
    return parts.reduce((result, word) => (result += upperFirst(word)), '');
};