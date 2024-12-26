const customError = require("../utils/customError");
const transactionModel = require("../models/transactionModel");
const topUpModel = require("../models/topUpModel");
const User = require("../models/userModel");

const topUp = async (req, res, next) => {
  try {
    const { amount, email } = req.body;
    const userId = req.user;

    // check input data
    if (!amount || !email) {
      throw customError("Please fill in all information.", 400);
    }
    if (!userId) {
      throw customError("Please login.", 400);
    }

    // check admin and customer
    const admin = await User.findById(userId).select("-password");
    const customer = await User.findOne({ email: email }).select("-password");

    if (!admin || admin.role !== "admin") {
      throw customError("No admin rights to access the api.", 400);
    }
    if (!customer) {
      throw customError("This email does not exist in the system.", 400);
    }

    // topUp
    const topUp = await topUpModel.create({
      adminId: admin._id,
      customerId: customer._id,
      amount,
    });

    // create transaction
    const latestTransaction = await transactionModel
      .findOne({ userId: customer._id })
      .sort({ createdAt: -1 });

    const newBalance = latestTransaction
      ? latestTransaction.balance + amount
      : amount;

    const transaction = await transactionModel.create({
      userId: customer._id,
      amount: amount,
      balance: newBalance,
      relatedId: topUp._id,
      refModel: "TopUp",
    });

    // response
    res.status(200).json({ topUp, transaction });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  topUp,
};
