const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const strReq = { type: String, required: true };
const numReq = { type: Number, required: true };
const userdata = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    shortName: String,
    image: String,
    organizationName: {
      type: String,
      required: [true, "Organization name is requried"],
    },
    mobile2: Number,
    address1: { type: String, required: [true, "Address 1 is required"] },
    address2: String,
    address3: String,
    country: strReq,
    state: strReq,
    city: strReq,
    landMark: strReq,
    gstNumber: strReq,
    employeeNumber: numReq,
    turnover: numReq,
    businessCategory: [
      {
        type: ObjectId,
        ref: "business_category",
      },
    ],
    businessSubCategory: [
      {
        type: ObjectId,
        ref: "product_category",
      },
    ],
    password: String,
    country: String,
    state: String,
    city: String,
    gstImage: String,
    panImage: String,
    companyBrochure: String,
    panNumber: String,
    typeOfCompany: String,
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
