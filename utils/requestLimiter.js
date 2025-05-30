const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: {
		error: "Too many requests from this IP, please try again later.",
		code: "RATE_LIMIT_EXCEEDED",
	},
})
module.exports = limiter
