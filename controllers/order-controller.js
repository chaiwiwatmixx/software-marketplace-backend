const customError = require("../utils/customError");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;
    const { price, quantity } = req.body;

    // check info
    if (!price || !quantity) {
      throw customError("Please fill in all information.", 400);
    }

    // check login
    if (!userId) {
      throw customError("Please login.", 400);
    }
    // check admin
    const user = await userModel.findById(userId).select("-password");
    if (!user || user.role !== "customer") {
      throw customError("This account does not exist in the system.", 404);
    }

    // check balance
    const latestTransaction = await transactionModel
      .findOne({ userId: userId })
      .sort({ createdAt: -1 });
    if (
      !latestTransaction ||
      latestTransaction.balance == 0 ||
      latestTransaction.balance < price
    ) {
      throw customError("Insufficient balance.", 400);
    }

    // get product Detail
    const product = await productModel.findById(productId);
    if (!product) {
      throw customError("Product not found.", 404);
    }
    const productDetail = product.productAccount.slice(0, quantity);

    // Prepare product data
    const orderDetail = productDetail.map((detail) => ({
      ...detail,
      sellDate: new Date(),
      status: "sold",
    }));

    // create order
    const order = await orderModel.create({
      userId,
      productId,
      product: orderDetail,
      price,
      quantity,
    });

    if (!order) {
      throw customError("error create .", 400);
    }

    // delete productDetail from productmodel
    const prepareInfoUpdate = product.productAccount.slice(quantity);
    await productModel.findByIdAndUpdate(
      productId,
      { productAccount: prepareInfoUpdate },
      { new: true }
    );

    // update Transaction
    const newBalance = latestTransaction.balance - price;
    const updateTransaction = await transactionModel.create({
      userId,
      amount: -price,
      balance: newBalance,
      relatedId: order._id,
      refModel: "Order",
    });

    res.status(200).json({ order, updateTransaction });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createOrder,
};
