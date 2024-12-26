const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add UserId"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please add product ID"],
    },
    product: [
      {
        productDetail: {
          type: String,
          required: [true, "Please add product name"],
        },
        createDate: {
          type: Date,
          required: [true, "Please add product creation date"],
        },
        sellDate: {
          type: Date,
          required: [true, "Please add product sell date"],
        },
        status: {
          type: String,
          required: [true, "Please add product status"],
          default: "sell",
          enum: ["sell", "sold", "problem"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
