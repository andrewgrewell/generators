const path = require('path');


module.exports = function(fromPath, toPath) {
    return path.relative(fromPath, toPath);
};