

module.exports = function(string, regex) {
    let extractions = [];
    let m;
    while (m = regex.exec(string)) {
        let result = [];
        if (m.length > 2) {
            for (let i = 1; i < m.length; i++) {
                result.push(m[i]);
            }
        }
        else {
            result = m[1];
        }
        extractions.push(result);
    }
    return extractions;
};