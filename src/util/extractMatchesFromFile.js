const fs = require('fs');


module.exports = function(filePath, regex) {
    let contents = fs.readFileSync(filePath, 'utf8');
    let extractions = [];
    let m;
    while (m = regex.exec(contents)) {
        extractions.push(m[1]);
    }
    return extractions;
};