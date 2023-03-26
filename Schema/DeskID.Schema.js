const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userdata = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "Number (number) is required"],
      unique: true,
    },
    user: { type: ObjectId, ref: "user" },
    description: String,
    status: {
      type: String,
      enum: ["Active", "Deactive", "Hold", "Block", "Not in use"],
      default: "Active",
    },
    isValid: { type: Boolean, default: true },
  },

  { timestamps: true }
);

module.exports = new mongoose.model("desk", userdata);
