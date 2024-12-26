const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add UserId"],
    },
    amount: {
      type: Number,
      required: [true, "Please add amount"],
    },
    balance: {
      type: Number,
      required: [true, "Please add balance"],
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add TopUpID or OrderId"],
    },
    refModel: {
      type: String,
      enum: ["TopUp", "Order"], // ระบุว่าเชื่อมโยงกับ Model ไหน
      required: [true, "Please add refModel TopUp Order"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
