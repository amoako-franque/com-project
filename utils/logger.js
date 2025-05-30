const chalk = require("chalk")

const colors = {
	info: chalk.blue,
	success: chalk.green,
	warning: chalk.yellow,
	error: chalk.red,
	debug: chalk.gray,
}

const logLevels = {
	INFO: "info",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
	DEBUG: "debug",
}

/**
 * Format timestamp in a consistent way
 * @returns {string} Formatted timestamp
 */
const getTimestamp = () => {
	const now = new Date()
	return now.toISOString()
}

/**
 * Format HTTP method with appropriate color
 * @param {string} method - HTTP method
 * @returns {string} Colored method string
 */
const formatMethod = (method) => {
	const methodColors = {
		GET: chalk.green,
		POST: chalk.blue,
		PUT: chalk.yellow,
		DELETE: chalk.red,
		PATCH: chalk.magenta,
	}
	return (methodColors[method] || chalk.white)(method.padEnd(7))
}

/**
 * Format status code with appropriate color
 * @param {number} status - HTTP status code
 * @returns {string} Colored status string
 */
const formatStatus = (status) => {
	if (status >= 500) return chalk.red(status)
	if (status >= 400) return chalk.yellow(status)
	if (status >= 300) return chalk.cyan(status)
	if (status >= 200) return chalk.green(status)
	return chalk.gray(status)
}

/**
 * Format response time with appropriate color
 * @param {string} time - Response time string
 * @returns {string} Colored time string
 */
const formatResponseTime = (time) => {
	const ms = parseInt(time)
	if (ms > 1000) return chalk.red(`${ms}ms`)
	if (ms > 500) return chalk.yellow(`${ms}ms`)
	return chalk.green(`${ms}ms`)
}

/**
 * Main logging function
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} [meta] - Additional metadata
 */
const log = (level, message, meta = {}) => {
	const timestamp = getTimestamp()
	const color = colors[level] || chalk.white
	const formattedMessage = color(`[${level}] ${message}`)

	console.log(`${timestamp} ${formattedMessage}`, meta)
}

/**
 * HTTP request logger middleware
 */
const requestLogger = (req, res, next) => {
	const start = process.hrtime()

	res.on("finish", () => {
		const [seconds, nanoseconds] = process.hrtime(start)
		const responseTime = `${(seconds * 1000 + nanoseconds / 1000000).toFixed(
			2
		)}`

		const method = formatMethod(req.method)
		const url = chalk.cyan(req.url)
		const status = formatStatus(res.statusCode)
		const time = formatResponseTime(responseTime)
		const env = chalk.gray(process.env.NODE_ENV || "development")

		console.log(`${getTimestamp()} ${method} ${url} ${status} ${time} ${env}`)
	})

	next()
}

module.exports = {
	log,
	logLevels,
	requestLogger,
}
