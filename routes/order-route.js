const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const { createOrder } = require("../controllers/order-controller");
const router = express.Router();

router.post("/:id", authMiddleware, createOrder);

module.exports = router;
