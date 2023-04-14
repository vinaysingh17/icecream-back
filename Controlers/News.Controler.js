const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const News = require("../Schema/News.Schema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    let fields = { name };

    // return null;
    if (!validator.validateField(fields, res)) return null;
    const savedData = await News.create({
      ...req.body,
    });

    SendSuccess(res, "News Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await News.find(req.query);
    SendSuccess(res, "News Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await News.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "News Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Update = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) return SendFail(res, " NEws id is requred", {});
    const data = await News.findByIdAndUpdate(id, {
      ...req.body,
    });
    SendSuccess(res, "News Updated", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

module.exports = {
  read,
  create,
  Update,
  Delete,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
