const validateInputProvider = require('./validateInputProvider');

module.exports = validateInputProvider('Name required', (name) => {
    if (/[^a-zA-Z\s]/.test(name)) {
        return {
            hasError: true,
            errorMessage: 'only letters and spaces'
        };
    }
    return true;
});