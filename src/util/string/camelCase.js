const upperFirst = require('./upperFirst');


module.exports = function properCase(string) {
    let parts = string.split(' ');
    return parts.reduce((result, word, i) => {
        if (i === 0) {
            return word.toLowerCase();
        }
        return result += upperFirst(word);
    }, '');
};