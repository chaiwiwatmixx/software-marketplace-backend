const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const { createOrder } = require("../controllers/order-controller");
const router = express.Router();

router.post("/:id", authMiddleware, createOrder);

module.exports = router;

// swagger docs api
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - price
 *         - quantity
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID
 *         productId:
 *           type: string
 *           description: The product ID
 *         product:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productDetail:
 *                 type: string
 *                 description: The product detail
 *               createDate:
 *                 type: string
 *                 format: date-time
 *                 description: The creation date of the product
 *               sellDate:
 *                 type: string
 *                 format: date-time
 *                 description: The sell date of the product
 *               status:
 *                 type: string
 *                 description: The status of the product
 *                 enum: [sell, sold, problem]
 *         price:
 *           type: number
 *           description: The price of the order
 *         quantity:
 *           type: number
 *           description: The quantity of the order
 *       example:
 *         userId: "60d0fe4f5311236168a109ca"
 *         productId: "60d0fe4f5311236168a109cb"
 *         product:
 *           - productDetail: "Detail 1"
 *             createDate: "2023-10-01T00:00:00Z"
 *             sellDate: "2023-10-10T00:00:00Z"
 *             status: "sold"
 *         price: 100
 *         quantity: 1
 *     Transaction:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *         - balance
 *         - relatedId
 *         - refModel
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID
 *         amount:
 *           type: number
 *           description: The transaction amount
 *         balance:
 *           type: number
 *           description: The balance after the transaction
 *         relatedId:
 *           type: string
 *           description: The related document ID
 *         refModel:
 *           type: string
 *           description: The reference model
 *       example:
 *         userId: "60d0fe4f5311236168a109ca"
 *         amount: -100
 *         balance: 900
 *         relatedId: "60d0fe4f5311236168a109cc"
 *         refModel: "Order"
 */
/**
 * @swagger
 * /order/{id}:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: The price of the order
 *               quantity:
 *                 type: number
 *                 description: The quantity of the order
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 updateTransaction:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
