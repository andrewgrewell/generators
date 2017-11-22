

module.exports = function insertIntoString(string, position, insert) {
    return string.slice(0, position) + insert + string.slice(position);
};