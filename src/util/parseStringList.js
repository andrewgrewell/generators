

module.exports = function parseStringList(string) {
    string = string.replace(' ', '');
    return string.split(',');
};