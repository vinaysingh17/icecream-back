const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const DeskSchema = require("../Schema/DeskID.Schema");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    let fields = { number, user };

    // return null;
    // console.log(fields, "<< these are fields");
    if (!validator.validateField(fields, res)) return null;
    const savedData = await DeskSchema.create({
      ...req.body,
    });

    SendSuccess(res, "Category Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await DeskSchema.find(req.query)
      .sort({ number: -1 })
      .populate("user");

    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DeskSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Category Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DeskSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
  update,
  Delete,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
