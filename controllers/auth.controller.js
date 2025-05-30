const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const prisma = require("../config/db")
const { log, logLevels } = require("../utils/logger")
const {
	ValidationError,
	AuthenticationError,
	ConflictError,
	DatabaseError,
	asyncHandler,
} = require("../utils/errors")

const secret = process.env.JWT_SECRET
const issuer = process.env.JWT_SECRET_ISSUER || "localhost"
const audience = process.env.JWT_SECRET_AUDIENCE || "localhost"
const expiration = process.env.JWT_SECRET_EXPIRES_IN || "7d"

const generateToken = (userId, email) => {
	return jwt.sign({ userId, email }, secret, {
		issuer,
		audience,
		expiresIn: expiration,
	})
}

const register = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body

	const existingUser = await prisma.user.findUnique({
		where: { email },
	})

	if (existingUser) {
		log(logLevels.WARNING, "Registration attempt with existing email", {
			email,
		})
		throw new ConflictError("Email already registered")
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user
		.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		})
		.catch((error) => {
			throw new DatabaseError("Failed to create user")
		})

	const token = generateToken(user.id, user.email)

	log(logLevels.SUCCESS, "User registered successfully", {
		userId: user.id,
		email: user.email,
	})

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		data: {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
			token,
		},
	})
})

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new ValidationError("Email and password are required")
	}

	const user = await prisma.user.findUnique({
		where: { email },
	})

	if (!user) {
		log(logLevels.WARNING, "Login attempt with non-existent email", { email })
		throw new AuthenticationError("Invalid credentials")
	}

	const validPassword = await bcrypt.compare(password, user.password)

	if (!validPassword) {
		log(logLevels.WARNING, "Login attempt with invalid password", { email })
		throw new AuthenticationError("Invalid credentials")
	}

	const token = generateToken(user.id, user.email)

	log(logLevels.SUCCESS, "User logged in successfully", {
		userId: user.id,
		email: user.email,
	})

	res.json({
		success: true,
		message: "Login successful",
		data: {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
			token,
		},
	})
})

const getProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { id: req.user.id },
		select: {
			id: true,
			email: true,
			name: true,
			createdAt: true,
			updatedAt: true,
		},
	})

	if (!user) {
		log(logLevels.WARNING, "Profile fetch failed - user not found", {
			userId: req.user.id,
		})
		throw new NotFoundError("User not found")
	}

	log(logLevels.SUCCESS, "User profile retrieved successfully", {
		userId: user.id,
	})

	res.json({
		success: true,
		data: { user },
	})
})

module.exports = {
	register,
	login,
	getProfile,
}
