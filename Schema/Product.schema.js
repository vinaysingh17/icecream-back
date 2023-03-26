const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_subcategory",
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", userdata);
