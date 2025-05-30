const prisma = require("../config/db")
const { log, logLevels } = require("../utils/logger")
const { NotFoundError, DatabaseError } = require("../utils/errors")

const getProducts = async (req, res, next) => {
	try {
		const {
			page = 1,
			limit = 20,
			search,
			sortBy = "createdAt",
			sortOrder = "desc",
			inStock,
		} = req.query

		const skip = (parseInt(page) - 1) * parseInt(limit)
		const take = parseInt(limit)

		const where = {}
		if (search) {
			where.OR = [
				{ name: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			]
		}
		if (inStock !== undefined) {
			where.stock = inStock === "true" ? { gt: 0 } : { equals: 0 }
		}

		const total = await prisma.product.count({ where })

		const products = await prisma.product.findMany({
			where,
			skip,
			take,
			orderBy: { [sortBy]: sortOrder },
			include: {
				_count: {
					select: {
						orderItems: true,
					},
				},
			},
		})

		const enhancedProducts = products.map((product) => ({
			...product,
			isInStock: product.stock > 0,
			isLowStock: product.stock > 0 && product.stock <= 10,
			totalOrdered: product._count.orderItems,
		}))

		log(logLevels.SUCCESS, "Products retrieved successfully", {
			count: products.length,
			page,
			limit,
			total,
		})

		res.json({
			success: true,
			data: {
				products: enhancedProducts,
				pagination: {
					page: parseInt(page),
					limit: parseInt(limit),
					total,
					totalPages: Math.ceil(total / take),
				},
			},
		})
	} catch (error) {
		log(logLevels.ERROR, "Failed to retrieve products", {
			error: error.message,
			query: req.query,
		})
		next(new DatabaseError("Failed to retrieve products"))
	}
}

const getProductById = async (req, res, next) => {
	try {
		const { id } = req.params

		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				orderItems: {
					select: {
						quantity: true,
						priceAtOrder: true,
						order: {
							select: {
								createdAt: true,
							},
						},
					},
					orderBy: {
						order: {
							createdAt: "desc",
						},
					},
					take: 5,
				},
				_count: {
					select: {
						orderItems: true,
					},
				},
			},
		})

		if (!product) {
			log(logLevels.WARNING, "Product not found", { productId: id })
			throw new NotFoundError("The requested product does not exist")
		}

		const enhancedProduct = {
			...product,
			isInStock: product.stock > 0,
			isLowStock: product.stock > 0 && product.stock <= 10,
			stockStatus:
				product.stock === 0
					? "out_of_stock"
					: product.stock <= 10
					? "low_stock"
					: "in_stock",
			totalOrders: product._count.orderItems,
			totalQuantitySold: product.orderItems.reduce(
				(sum, item) => sum + item.quantity,
				0
			),
			averageOrderPrice:
				product.orderItems.length > 0
					? product.orderItems.reduce(
							(sum, item) => sum + item.priceAtOrder,
							0
					  ) / product.orderItems.length
					: 0,
			recentOrders: product.orderItems.map((item) => ({
				quantity: item.quantity,
				priceAtOrder: item.priceAtOrder,
				orderDate: item.order.createdAt,
			})),
		}

		log(logLevels.SUCCESS, "Product retrieved successfully", {
			productId: id,
			stockStatus: enhancedProduct.stockStatus,
		})

		res.json({
			success: true,
			data: { product: enhancedProduct },
		})
	} catch (error) {
		log(logLevels.ERROR, "Failed to retrieve product", {
			error: error.message,
			productId: req.params.id,
		})
		next(error)
	}
}

module.exports = {
	getProducts,
	getProductById,
}
