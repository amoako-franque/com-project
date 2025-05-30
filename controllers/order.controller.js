const prisma = require("../config/db")
const { processPayment } = require("../utils/paymentService")
const { validationResult } = require("express-validator")
const { log, logLevels } = require("../utils/logger")
const {
	ValidationError,
	NotFoundError,
	PaymentError,
	DatabaseError,
} = require("../utils/errors")

const ORDER_STATUS = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	CANCELLED: "CANCELLED",
}

const PAYMENT_STATUS = {
	PENDING: "PENDING",
	PAID: "PAID",
	FAILED: "FAILED",
}

const validatePagination = (page, limit) => {
	const parsedPage = Math.max(1, parseInt(page) || 1)
	const parsedLimit = Math.min(100, Math.max(1, parseInt(limit) || 20))
	return { page: parsedPage, limit: parsedLimit }
}

const createOrder = async (req, res) => {
	try {
		const { items } = req.body
		if (!req.user?.id) {
			throw new Error("User not authenticated")
		}
		if (!Array.isArray(items) || items.length === 0) {
			throw new ValidationError("Items must be a non-empty array")
		}

		const userId = req.user.id

		const result = await prisma
			.$transaction(async (tx) => {
				const productIds = items.map((item) => item.productId)
				const products = await tx.product.findMany({
					where: { id: { in: productIds } },
				})

				if (products.length !== items.length) {
					throw new NotFoundError("One or more products not found")
				}

				products.forEach((product) => {
					const item = items.find((i) => i.productId === product.id)
					if (!item || item.quantity <= 0) {
						throw new ValidationError("Invalid quantity for product")
					}
					if (product.stock < item.quantity) {
						throw new ValidationError(
							`Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
						)
					}
					product.requestedQuantity = item.quantity
				})

				const totalAmount = products.reduce((sum, product) => {
					return sum + Number(product.price) * product.requestedQuantity
				}, 0)

				const order = await tx.order.create({
					data: {
						userId,
						totalAmount,
						status: ORDER_STATUS.PENDING,
						paymentStatus: PAYMENT_STATUS.PENDING,
					},
				})

				const orderItems = products.map((product) => ({
					orderId: order.id,
					productId: product.id,
					quantity: product.requestedQuantity,
					priceAtOrder: product.price,
				}))

				await tx.orderItem.createMany({ data: orderItems })

				for (const product of products) {
					await tx.product.update({
						where: { id: product.id },
						data: { stock: { decrement: product.requestedQuantity } },
					})
				}

				return { order, orderItems }
			})
			.catch((error) => {
				if (
					error instanceof ValidationError ||
					error instanceof NotFoundError
				) {
					throw error
				}
				throw new DatabaseError("Failed to create order")
			})

		const paymentResult = await processPayment(
			result.order.totalAmount,
			result.order.id
		)

		if (!paymentResult.success) {
			await prisma.$transaction(async (tx) => {
				for (const item of items) {
					await tx.product.update({
						where: { id: item.productId },
						data: { stock: { increment: item.quantity } },
					})
				}
			})
			throw new PaymentError(paymentResult.message)
		}

		const updatedOrder = await prisma.order.update({
			where: { id: result.order.id },
			data: {
				paymentStatus: PAYMENT_STATUS.PAID,
				status: ORDER_STATUS.COMPLETED,
				paymentGatewayTransactionId: paymentResult.transactionId,
			},
			include: {
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								price: true,
							},
						},
					},
				},
			},
		})

		log(logLevels.SUCCESS, "Order created successfully", {
			orderId: result.order.id,
			userId,
			totalAmount: Number(result.order.totalAmount),
			itemCount: result.orderItems.length,
		})

		res.status(201).json({
			message: "Order created successfully",
			order: {
				...updatedOrder,
				totalAmount: Number(updatedOrder.totalAmount),
				orderItems: updatedOrder.orderItems.map((item) => ({
					...item,
					priceAtOrder: Number(item.priceAtOrder),
					product: {
						...item.product,
						price: Number(item.product.price),
					},
				})),
			},
		})
	} catch (error) {
		log(logLevels.ERROR, "Order creation failed", {
			error: error.message,
			userId: req.user?.id,
		})
		if (
			error instanceof NotFoundError ||
			error instanceof ValidationError ||
			error instanceof PaymentError
		) {
			return res.status(400).json({ error: error.message })
		}
		res.status(500).json({ error: "Order creation failed" })
	}
}

const getOrders = async (req, res) => {
	try {
		const userId = req.user?.id

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: "User authentication required",
			})
		}

		const {
			page: rawPage,
			limit: rawLimit,
			status,
			paymentStatus,
			sortBy = "createdAt",
			sortOrder = "desc",
		} = req.query
		const { page, limit } = validatePagination(rawPage, rawLimit)
		const skip = (page - 1) * limit

		const whereClause = {
			userId,
			...(status && { status: status.toUpperCase() }),
			...(paymentStatus && { paymentStatus: paymentStatus.toUpperCase() }),
		}

		const validSortFields = ["createdAt", "updatedAt", "totalAmount", "status"]
		const validSortOrders = ["asc", "desc"]
		const orderBy = {
			[validSortFields.includes(sortBy) ? sortBy : "createdAt"]:
				validSortOrders.includes(sortOrder.toLowerCase())
					? sortOrder.toLowerCase()
					: "desc",
		}

		const [orders, total] = await Promise.all([
			prisma.order.findMany({
				where: whereClause,
				include: {
					orderItems: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									price: true,
									description: true,
								},
							},
						},
					},
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy,
				skip,
				take: limit,
			}),
			prisma.order.count({
				where: whereClause,
			}),
		])

		const totalPages = Math.ceil(total / limit)

		const transformedOrders = orders.map((order) => ({
			...order,
			totalAmount: Number(order.totalAmount),
			itemCount: order.orderItems.length,
			totalItems: order.orderItems.reduce(
				(sum, item) => sum + item.quantity,
				0
			),
			orderItems: order.orderItems.map((item) => ({
				...item,
				priceAtOrder: Number(item.priceAtOrder),
				product: {
					...item.product,
					price: Number(item.product.price),
				},
			})),
		}))

		log(logLevels.SUCCESS, "Orders retrieved successfully", {
			userId,
			count: orders.length,
			page,
			limit,
			total,
		})

		res.status(200).json({
			message: "Orders retrieved successfully",
			data: {
				orders: transformedOrders,
				pagination: {
					page,
					limit,
					total,
					totalPages,
				},
			},
		})
	} catch (error) {
		log(logLevels.ERROR, "Failed to retrieve orders", {
			error: error.message,
			userId: req.user?.id,
		})
		res.status(500).json({
			success: false,
			error: "Failed to retrieve orders",
		})
	}
}

const getOrderById = async (req, res) => {
	try {
		const { id } = req.params
		const userId = req.user?.id

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: "User authentication required",
			})
		}

		const order = await prisma.order.findFirst({
			where: {
				id,
				userId,
			},
			include: {
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								price: true,
								description: true,
							},
						},
					},
				},
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		})

		if (!order) {
			log(logLevels.WARNING, "Order not found", {
				orderId: id,
				userId,
			})
			return res.status(404).json({
				success: false,
				error: "Order not found",
			})
		}

		if (order.userId !== userId) {
			log(logLevels.WARNING, "Unauthorized order access attempt", {
				orderId: id,
				userId,
				orderUserId: order.userId,
			})
			return res.status(403).json({
				success: false,
				error: "Not authorized to access this order",
			})
		}

		log(logLevels.SUCCESS, "Order retrieved successfully", {
			orderId: id,
			userId,
		})

		const transformedOrder = {
			...order,
			totalAmount: Number(order.totalAmount),
			orderItems: order.orderItems.map((item) => ({
				...item,
				priceAtOrder: Number(item.priceAtOrder),
				product: {
					...item.product,
					price: Number(item.product.price),
				},
			})),
		}

		res.status(200).json({
			success: true,
			data: {
				order: transformedOrder,
			},
		})
	} catch (error) {
		log(logLevels.ERROR, "Failed to retrieve order", {
			error: error.message,
			orderId: req.params.id,
			userId: req.user?.id,
		})
		res.status(500).json({
			success: false,
			error: "Failed to retrieve order",
		})
	}
}

module.exports = {
	createOrder,
	getOrders,
	getOrderById,
}
