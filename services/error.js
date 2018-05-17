import Status from '../configs/statuses';
/**
 * @extends Error
 */
class ApiError extends Error {
    /**
        * Creates an API error.
        *
        * @param {String} message - Error message.
        * @param {Number} status - HTTP status code of error.
        * @param {Boolean} isPublic - Whether the message should be visible to user or not.
    */
    constructor(message, status = Status.INTERNAL_SERVER_ERROR, isPublic = false) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        Error.captureStackTrace(this, this.constructor.name);
    }
}

export default ApiError;