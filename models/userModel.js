const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Please add role"],
      enum: ["admin", "sale", "customer"],
    },
    // balance: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Transaction",
    //   required: [true, "Please add userId"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
