const mongoose = require("mongoose");

const topUpSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add UserId"],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add UserId"],
    },
    amount: {
      type: Number,
      required: [true, "Please add amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TopUp", topUpSchema);
