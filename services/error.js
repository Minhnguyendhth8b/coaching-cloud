import ErrorUtils from './error-utils';

const Error = (options) => {
    if (!options) {
        options = [];
    }
    if (Array.isArray(options)) {
        return ErrorUtils(options);
    } else {
        return ErrorUtils([options]);
    }
}

export default Error;