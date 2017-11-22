

module.exports = function parseStringList(string) {
    string = string.replace(/,/gm,' ');
    string = string.replace(/\s{2,}/gm, ' ');
    return string.split(' ');
};