const defaultAdditionalValidator = function() {
    return {
        hasError: false
    };
};

module.exports = (errorMessage, additionalValidator) => {
    errorMessage = errorMessage || 'A value is required';
    additionalValidator = additionalValidator || defaultAdditionalValidator;

    return (value) => {
        var hasValue = /.+/.test(value);
        var additionalValidation = additionalValidator(value);

        if (hasValue && !additionalValidation.hasError) {
            return true;
        }

        return additionalValidation.errorMessage || errorMessage;
    };
};