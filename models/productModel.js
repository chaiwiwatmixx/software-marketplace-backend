const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add UserId"],
    },
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    subDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    productAccount: [
      {
        productDetail: {
          type: String,
          required: [true, "Please add product"],
        },
        createDate: {
          type: Date,
          required: [true, "Please add product creation date"],
          default: Date.now,
        },
        status: {
          type: String,
          required: [true, "Please add product status"],
          default: "sell",
          enum: ["sell", "sold", "problem"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
