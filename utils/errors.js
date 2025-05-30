const { log, logLevels } = require("./logger")

class AppError extends Error {
	constructor(message, statusCode, errorCode) {
		super(message)
		this.statusCode = statusCode
		this.errorCode = errorCode
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

class ValidationError extends AppError {
	constructor(message, errors) {
		super(message, 400, "VALIDATION_ERROR")
		this.errors = errors
	}
}

class AuthenticationError extends AppError {
	constructor(message = "Authentication failed") {
		super(message, 401, "AUTHENTICATION_ERROR")
	}
}

class AuthorizationError extends AppError {
	constructor(message = "Not authorized") {
		super(message, 403, "AUTHORIZATION_ERROR")
	}
}

class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404, "NOT_FOUND_ERROR")
	}
}

class ConflictError extends AppError {
	constructor(message = "Resource conflict") {
		super(message, 409, "CONFLICT_ERROR")
	}
}

class DatabaseError extends AppError {
	constructor(message = "Database operation failed") {
		super(message, 500, "DATABASE_ERROR")
	}
}

class PaymentError extends AppError {
	constructor(message = "Payment processing failed") {
		super(message, 400, "PAYMENT_ERROR")
	}
}

const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.status = err.status || "error"

	log(logLevels.ERROR, "Error occurred", {
		error: err.message,
		stack: err.stack,
		path: req.path,
		method: req.method,
		userId: req.user?.id,
		errorCode: err.errorCode,
		statusCode: err.statusCode,
	})

	if (process.env.NODE_ENV === "development") {
		res.status(err.statusCode).json({
			success: false,
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
			errorCode: err.errorCode,
		})
	} else {
		if (err.isOperational) {
			res.status(err.statusCode).json({
				success: false,
				status: err.status,
				message: err.message,
				errorCode: err.errorCode,
			})
		} else {
			log(logLevels.ERROR, "Unexpected error", {
				error: err.message,
				stack: err.stack,
			})

			res.status(500).json({
				success: false,
				status: "error",
				message: "Something went wrong",
				errorCode: "INTERNAL_SERVER_ERROR",
			})
		}
	}
}

const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next)
}

const notFoundHandler = (req, res, next) => {
	next(new NotFoundError(`Route ${req.originalUrl} not found`))
}

module.exports = {
	AppError,
	ValidationError,
	AuthenticationError,
	AuthorizationError,
	NotFoundError,
	ConflictError,
	DatabaseError,
	PaymentError,
	errorHandler,
	asyncHandler,
	notFoundHandler,
}
