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

const validateCreateOrder = [
	body("items")
		.isArray({ min: 1 })
		.withMessage("At least one item is required"),
	body("items.*.productId")
		.isString()
		.withMessage("Valid product ID is required")
		.notEmpty()
		.withMessage("Product ID cannot be empty"),
	body("items.*.quantity")
		.isInt({ min: 1 })
		.withMessage("Quantity must be a positive integer"),
	handleValidationErrors,
]
const validateGetOrders = [
	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be a positive integer"),
	query("limit")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Limit must be a positive integer between 1 and 100"),
	handleValidationErrors,
]
const validateGetOrderById = [
	param("id")
		.isString()
		.withMessage("Order ID must be a valid string")
		.notEmpty()
		.withMessage("Order ID cannot be empty"),
	handleValidationErrors,
]

module.exports = {
	validateCreateOrder,
	validateGetOrderById,
	validateGetOrders,
}
