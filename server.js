const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/project-route");
const transactionsRoute = require("./routes/transaction-route");
const orderRoute = require("./routes/order-route");
const errorHandler = require("./middlewares/error-middleware");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/auth", authRoute);
app.use("/products", productRoute);
// app.use("/api/orders");
app.use("/transactions", transactionsRoute);
app.use("/order", orderRoute);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
