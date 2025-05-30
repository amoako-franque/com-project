const { body, validationResult, param, query } = require("express-validator")

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const formattedErrors = errors.array().map((error) => ({
			field: error.path || error.param,
			message: error.msg,
			value: error.value,
		}))

		return res.status(400).json({
			error: "Validation failed",
			code: "VALIDATION_ERROR",
			details: formattedErrors,
		})
	}
	next()
}

const registerValidation = [
	body("name")
		.trim()
		.isLength({ min: 2 })
		.withMessage("Name must be at least 2 characters long")
		.matches(/^[a-zA-Z\s]+$/)
		.withMessage("Name can only contain letters and spaces"),

	body("email")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
		.withMessage(
			"Password must contain at least one lowercase letter, one uppercase letter, and one number"
		),

	handleValidationErrors,
]

const loginValidation = [
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password").notEmpty().withMessage("Password is required"),

	handleValidationErrors,
]

module.exports = {
	registerValidation,
	loginValidation,
}
