
module.exports = function whenTypeProvider(type) {
    return (answers) => answers.type === type;
};