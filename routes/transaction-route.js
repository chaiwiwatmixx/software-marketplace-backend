const express = require("express");
const { topUp } = require("../controllers/transaction-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/", authMiddleware, topUp);

module.exports = router;

// swagger docs api
/**
 * @swagger
 * components:
 *   schemas:
 *     TopUp:
 *       type: object
 *       required:
 *         - adminId
 *         - customerId
 *         - amount
 *       properties:
 *         adminId:
 *           type: string
 *           description: The admin ID
 *         customerId:
 *           type: string
 *           description: The customer ID
 *         amount:
 *           type: number
 *           description: The top up amount
 *       example:
 *         adminId: "60d0fe4f5311236168a109ca"
 *         customerId: "60d0fe4f5311236168a109cb"
 *         amount: 100
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
 *         amount: 100
 *         balance: 200
 *         relatedId: "60d0fe4f5311236168a109cc"
 *         refModel: "TopUp"
 */
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Top up a customer's account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to top up
 *               email:
 *                 type: string
 *                 description: The customer's email
 *     responses:
 *       200:
 *         description: Top up successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topUp:
 *                   $ref: '#/components/schemas/TopUp'
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
