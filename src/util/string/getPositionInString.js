

module.exports = function getPositionInString(string, regex) {
    let match = regex.exec(string);
    return match && match[0].length;
};