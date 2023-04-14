const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userdata = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    businessCategory: {
      type: ObjectId,
      ref: "business_category",
    },
    productCategory: {
      type: ObjectId,
      ref: "product_category",
    },
    password: String,
    businessSubCategory: {
      type: ObjectId,
      ref: "product_category",
    },
    country: String,
    state: String,
    city: String,
    pinCode: Number,
    email: { type: String, unique: true },
    phone: {
      type: Number,
    },
    deskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "desk",
      default: null,
    },
    deskNumber: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["employee", "member", "admin", "submember", "guest"],
      required: [true, "Role is required"],
    },
    subUsers: [
      {
        type: Object,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userdata);
