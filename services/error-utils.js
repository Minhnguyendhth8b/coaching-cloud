const ErrorUtils = (errors) => {
    let result = {
        errors: []
    }

    errors.forEach((error) => {
        const options = {};

        if (error.id) options.id = error.id;
        if (error.status) options.status = error.status;
        if (error.code) options.code = error.code;
        if (error.title) options.title = error.title;
        if (error.detail) options.detail = error.detail;

        if (error.links) {
            options.links = {
                about: error.links.about
            }
        }

        if (error.meta) {
            options.meta = error.meta;
        }

        result.errors.push(options);
    })

    return result;
}

export default ErrorUtils;