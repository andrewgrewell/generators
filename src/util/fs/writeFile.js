const fs = require('fs');

module.exports = function writeFile(filePath, contents) {
    fs.writeFileSync(filePath, contents);
};