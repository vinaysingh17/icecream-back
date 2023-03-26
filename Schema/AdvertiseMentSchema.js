const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userdata = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "user",
    },
    place: {
      type: String,
      enum: "BANNER",
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("asset", userdata);
