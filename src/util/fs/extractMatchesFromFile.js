const readFileContents = require('./readFileContents');


module.exports = function(filePath, regex) {
    let contents = readFileContents(filePath);
    let extractions = [];
    let m;
    while (m = regex.exec(contents)) {
        extractions.push(m[1]);
    }
    return extractions;
};