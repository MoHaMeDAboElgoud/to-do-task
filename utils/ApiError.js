/* eslint-disable max-classes-per-file */
const { HTTP_CODES } = require('./codes');
const MESSAGES = require('./messages');

class ApiError extends Error {
	constructor(
		error = null,
		statusCode = HTTP_CODES.SERVER.INTERNAL,
		message = MESSAGES.INTERNAL_SERVER_ERROR,
		isOperational = true,
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		if (error) {
			if (error instanceof Error) {
				this.statusCode = error.statusCode || statusCode;
        this.message = error.message || message;
        this.isOperational = error.isOperational || isOperational;
				if (error.stack) {
					this.stack = error.stack;
				} else {
					Error.captureStackTrace(this, this.constructor);
				}
			} else {
				this.stack = error;
			}
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
		this.setSentryErrorLevel()
	}
	setSentryErrorLevel(){
		if (process.env.NODE_ENV == 'production') {
		  let status = Number(this.statusCode)
		  if(status >= 500){
			Sentry.setTag("Type", 'ERROR');
		  }else{
			Sentry.setTag("Type", 'WARN');
		  }
		  Sentry.setTag("status", status);
		  Sentry.captureException(this);
		}
	}

}


class BadRequestError extends ApiError {
	constructor(message = MESSAGES.BAD_REQUEST_ERROR, error = null) {
		super(error, HTTP_CODES.CLIENT.BAD_REQUEST, message, true);
	}
}

class UnauthorizedError extends ApiError {
	constructor(message = MESSAGES.UNAUTHORIZED_ERROR, error = null) {
		super(error, HTTP_CODES.CLIENT.UNAUTHORIZED, message, true);
	}
}

class ForbiddenError extends ApiError {
	constructor(message = MESSAGES.FORBIDDEN_ERROR, error = null) {
		super(error, HTTP_CODES.CLIENT.FORBIDDEN, message, true);
	}
}

class NotFoundError extends ApiError {
	constructor(message = MESSAGES.NOT_FOUND_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.NOT_FOUND, message, error, true);
	}
}

class ConflictError extends ApiError {
	constructor(message = MESSAGES.CONFLICT_ERROR, error = null) {
		super(error, HTTP_CODES.CLIENT.CONFLICT, message, true);
	}
}

class UnprocessableEntityError extends ApiError {
	constructor(message = MESSAGES.UNPROCESSABLE_ENTITY_ERROR, error = null) {
		super(error, HTTP_CODES.CLIENT.UNPROCESSABLE_ENTITY, message, true);
	}
}

class InternalServerError extends ApiError {
	constructor(message = MESSAGES.INTERNAL_SERVER_ERROR, error = null) {
		super(error, HTTP_CODES.SERVER.INTERNAL, message, true);
	}
}

module.exports = {
	ApiError,
	BadRequestError,
	ConflictError,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
	UnprocessableEntityError,
};
