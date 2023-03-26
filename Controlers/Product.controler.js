const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const ProductSchema = require("../Schema/Product.schema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    let fields = { name };
    console.log(req.files, "<<<these are files");
    if (!req.files.image.length) {
      return SendFail(res, "Image is required");
    }
    // return null;
    if (!validator.validateField(fields, res)) return null;
    const savedData = await ProductSchema.create({
      ...req.body,
      image: req.files.image[0].filename,
    });

    SendSuccess(res, "Category Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await ProductSchema.find(req.query);
    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Category Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

module.exports = {
  read,
  create,
  Delete,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
