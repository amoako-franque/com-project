const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middlewares/verifyToken")
const {
	validateCreateOrder,
	validateGetOrders,
	validateGetOrderById,
} = require("../middlewares/validators/order.validator")
const {
	createOrder,
	getOrders,
	getOrderById,
} = require("../controllers/order.controller")

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                       description: UUID of the product
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     totalAmount:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: string
 *                       enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *                     paymentStatus:
 *                       type: string
 *                       enum: [PENDING, PAID, FAILED]
 *                     paymentGatewayTransactionId:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     orderItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           orderId:
 *                             type: string
 *                             format: uuid
 *                           productId:
 *                             type: string
 *                             format: uuid
 *                           quantity:
 *                             type: integer
 *                           priceAtOrder:
 *                             type: number
 *                             format: float
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                                 format: float
 *       400:
 *         description: Validation error, product not found, insufficient stock, or payment failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Payment failed"
 *                 message:
 *                   type: string
 *                   example: "Payment gateway error"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     status:
 *                       type: string
 *                       enum: [FAILED]
 *                     paymentStatus:
 *                       type: string
 *                       enum: [FAILED]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Order creation failed"
 */
router.post("/orders", verifyToken, validateCreateOrder, createOrder)

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *         description: Filter by order status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [PENDING, PAID, FAILED]
 *         description: Filter by payment status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, totalAmount, status]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           userId:
 *                             type: string
 *                             format: uuid
 *                           totalAmount:
 *                             type: number
 *                             format: float
 *                           status:
 *                             type: string
 *                             enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *                           paymentStatus:
 *                             type: string
 *                             enum: [PENDING, PAID, FAILED]
 *                           paymentGatewayTransactionId:
 *                             type: string
 *                             nullable: true
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           itemCount:
 *                             type: integer
 *                           totalItems:
 *                             type: integer
 *                           orderItems:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   format: uuid
 *                                 orderId:
 *                                   type: string
 *                                   format: uuid
 *                                 productId:
 *                                   type: string
 *                                   format: uuid
 *                                 quantity:
 *                                   type: integer
 *                                 priceAtOrder:
 *                                   type: number
 *                                   format: float
 *                                 product:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: string
 *                                       format: uuid
 *                                     name:
 *                                       type: string
 *                                     price:
 *                                       type: number
 *                                       format: float
 *                                     description:
 *                                       type: string
 *                                       nullable: true
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User authentication required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve orders"
 */
router.get("/orders", verifyToken, validateGetOrders, getOrders)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the order
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         userId:
 *                           type: string
 *                           format: uuid
 *                         totalAmount:
 *                           type: number
 *                           format: float
 *                         status:
 *                           type: string
 *                           enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *                         paymentStatus:
 *                           type: string
 *                           enum: [PENDING, PAID, FAILED]
 *                         paymentGatewayTransactionId:
 *                           type: string
 *                           nullable: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                         orderItems:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               orderId:
 *                                 type: string
 *                                 format: uuid
 *                               productId:
 *                                 type: string
 *                                 format: uuid
 *                               quantity:
 *                                 type: integer
 *                               priceAtOrder:
 *                                 type: number
 *                                 format: float
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     format: uuid
 *                                   name:
 *                                     type: string
 *                                   price:
 *                                     type: number
 *                                     format: float
 *                                   description:
 *                                     type: string
 *                                     nullable: true
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User authentication required"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve order"
 */
router.get("/orders/:id", verifyToken, validateGetOrderById, getOrderById)

module.exports = router
