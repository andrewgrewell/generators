

module.exports = function parseStringList(string) {
    string = string.split(/,\s*/);
    let skippedIndexCount = 0;
    let currentObjectIndex = null;
    return string.reduce((result, value, i) => {
        if (/^{/.test(value)) {
            currentObjectIndex = i - skippedIndexCount;
            return result.concat(`${value},`);
        }
        else if (currentObjectIndex != null) {
            let closeObject = /}$/.test(value);
            skippedIndexCount += 1;
            result[currentObjectIndex] += ` ${value}${closeObject ? '' : ','}`;
            if (closeObject) {
                currentObjectIndex = null;
            }
            return result;
        }
        return result.concat(value);
    }, []);
};