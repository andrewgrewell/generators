

module.exports = function filterOutTypes(array) {
    return array.reduce((result, value) => {
        if (value === 'true' || value === 'false') {
            return result;
        }
        let asInt = parseInt(value);
        if (typeof asInt === 'number' && !isNaN(asInt)) {
            return result;
        }
        return result.concat([value]);
    }, []);
};