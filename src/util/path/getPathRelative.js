const path = require('path');


module.exports = function(toPath, fromPath) {
    return path.relative(toPath, fromPath);
};