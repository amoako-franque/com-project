const jwt = require("jsonwebtoken")
const { log, logLevels } = require("../utils/logger")
const prisma = require("../config/db")

const secret = process.env.JWT_SECRET
const issuer = process.env.JWT_ISSUER
const audience = process.env.JWT_AUDIENCE
const expiration = process.env.JWT_SECRET_EXPIRES_IN

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		log(logLevels.WARNING, "Authentication attempt without token", {
			path: req.path,
			method: req.method,
			ip: req.ip,
		})
		return res.status(401).json({
			success: false,
			error: "No token provided",
		})
	}

	const token = authHeader.split(" ")[1]

	if (!token) {
		return res.status(401).json({ message: "No token provided" })
	}

	try {
		const decoded = jwt.verify(token, secret, {
			issuer,
			audience,
			expiresIn: expiration,
		})

		if (!decoded.userId && !decoded.email) {
			log(logLevels.ERROR, "Token missing user identifier", {
				tokenPayload: decoded,
				path: req.path,
				method: req.method,
				ip: req.ip,
			})
			return res.status(401).json({
				success: false,
				error: "Invalid token format",
			})
		}

		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		})

		if (!user) {
			log(logLevels.WARNING, "User not found for token", {
				userId: decoded.userId,
				userEmail: decoded.email,
				path: req.path,
				method: req.method,
				ip: req.ip,
			})
			return res.status(404).json({
				success: false,
				error: "User not found",
			})
		}
		req.user = user
		log(logLevels.SUCCESS, "Token verified successfully", {
			userId: decoded.userId,
			path: req.path,
			method: req.method,
		})
		next()
	} catch (error) {
		log(logLevels.ERROR, "Token verification failed", {
			error: error.message,
			path: req.path,
			method: req.method,
			ip: req.ip,
		})
		return res.status(401).json({
			success: false,
			error: "Invalid token",
		})
	}
}
module.exports = { verifyToken }
