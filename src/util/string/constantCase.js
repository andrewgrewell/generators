

module.exports = function constantCase(string) {
    let parts = string.split(' ');
    string = string.toUpperCase();
    return string.replace(' ', '_');
};