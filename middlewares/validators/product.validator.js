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
			details: formattedErrors,
		})
	}
	next()
}

const validateGetProducts = [
	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be a positive integer"),
	query("limit")
		.optional()
		.isInt({ min: 1, max: 100 })
		.withMessage("Limit must be between 1 and 100"),
	query("search")
		.optional()
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage("Search term must be between 1 and 100 characters"),
	query("sortBy")
		.optional()
		.isIn(["name", "price", "stock", "createdAt", "updatedAt"])
		.withMessage("Invalid sort field"),
	query("sortOrder")
		.optional()
		.isIn(["asc", "desc"])
		.withMessage("Sort order must be asc or desc"),
	query("inStock")
		.optional()
		.isIn(["true", "false"])
		.withMessage("inStock must be true or false"),
	handleValidationErrors,
]
const validateGetProductById = [
	param("id")
		.isString()
		.withMessage("Product ID must be a valid string")
		.notEmpty()
		.withMessage("Product ID cannot be empty"),
	handleValidationErrors,
]

module.exports = { validateGetProducts, validateGetProductById }
