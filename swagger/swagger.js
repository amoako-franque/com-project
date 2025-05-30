const swaggerJSDoc = require("swagger-jsdoc")
const path = require("path")

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Simplified Ecommerce API",
			version: "1.0.0",
			description:
				"Demonstrates user authentication and transactional order creation with simulated payment.",
		},
		servers: [
			{
				url: process.env.SWAGGER_SERVER_URL || "http://localhost:5879",
				description:
					"Com Project API - Com Project API - Local Development Server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [{ bearerAuth: [] }],
	},
	apis: [path.join(__dirname, "..", "routes", "*.js")],
}

let swaggerSpec = null

try {
	swaggerSpec = swaggerJSDoc(options)
	if (!swaggerSpec || Object.keys(swaggerSpec.paths).length === 0) {
		console.warn("Warning: No API routes found in Swagger documentation")
	}
} catch (error) {
	console.error("Error generating Swagger specification:", error)
}

module.exports = swaggerSpec
