const fs = require('fs');


module.exports = function getDirectoryFiles(path) {
    let files = fs.readdirSync(path);
    return files.filter(fileName => /\./.test(fileName));
};