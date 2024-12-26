const express = require("express");
const { topUp } = require("../controllers/transaction-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/", authMiddleware, topUp);
// router.get("/");

module.exports = router;
