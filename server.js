require("dotenv").config()
const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const helmet = require("helmet")
const swaggerUi = require("swagger-ui-express")
const limiter = require("./utils/requestLimiter")
const swaggerDocument = require("./swagger/swagger")
const { requestLogger } = require("./utils/logger")
const { errorHandler, notFoundHandler } = require("./utils/errors")

const PORT = process.env.PORT || 5879

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/api/", limiter)

app.use(requestLogger)

app.get("/", (req, res) => {
	res.json({
		status: "success",
		message: "Welcome to the API",
		environment: process.env.NODE_ENV,
		version: "1.0.0",
		documentation: "/api-docs",
	})
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
	if (file.endsWith(".js")) {
		const route = require(`./routes/${file}`)
		app.use("/api", route)
	}
})

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
})
