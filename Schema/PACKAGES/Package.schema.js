const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userdata = new mongoose.Schema(
  {
    ratePerDay: {
      type: Number,
      // required: true,
      default: 1,
    },
    validFrom: Date,
    validTo: Date,
    discount: {
      type: Number,
    },
    type: {
      type: String,
      enum: [
        "Advertisement",
        "Manufacturer Registration",
        "Member Registration",
      ],
    },
    name: {
      type: String,
      uppercase: true,
    },
    code: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    businessCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business_category",
    },
    amount: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = new mongoose.model("package", userdata);
