const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const DeskSchema = require("../Schema/DeskID.Schema");
const UserSchema = require("../Schema/User");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    let fields = { number, user };

    if (!validator.validateField(fields, res)) return null;
    let checkEmployee = await UserSchema.findById(user).populate("deskId");
    if (checkEmployee.deskId) {
      return SendSuccess(
        res,
        "User already assigned in Desk ID " + checkEmployee?.number,
        checkEmployee
      );
    }
    // if(checkEmployee)
    const savedData = await DeskSchema.create({
      ...req.body,
      countEmployee: 1,
    });
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: savedData._id,
          deskNumber: number,
        },
        { new: true }
      );
    }

    SendSuccess(res, "Category Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const addEmployee = async (req, res, next) => {
  const { deskNumber, user, deskId } = req.body;
  try {
    let fields = { deskNumber, user, deskId };

    if (!validator.validateField(fields, res)) return null;
    let checkEmployee = await UserSchema.findById(user).populate("deskId");
    if (checkEmployee.deskId) {
      return SendSuccess(
        res,
        "User already assigned in Desk ID " + checkEmployee?.deskNumber,
        checkEmployee
      );
    }
    // if(checkEmployee)

    await DeskSchema.findOneAndUpdate(
      { _id: deskId },
      { $inc: { countEmployee: 1 } }
    );
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: deskId,
          deskNumber: deskNumber,
        },
        { new: true }
      );
    }

    return SendSuccess(res, "Category Created", []);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const removeEmployee = async (req, res, next) => {
  const { deskNumber, user, deskId } = req.body;
  try {
    let fields = { deskNumber, user, deskId };

    if (!validator.validateField(fields, res)) return null;
    // let checkEmployee = await UserSchema.findById(user).populate("deskId");
    // if (checkEmployee.deskId) {
    //   return SendSuccess(
    //     res,
    //     "User already assigned in Desk ID " + checkEmployee?.deskNumber,
    //     checkEmployee
    //   );
    // }
    // if(checkEmployee)

    await DeskSchema.findOneAndUpdate(
      { _id: deskId },
      { $inc: { countEmployee: -1 } }
    );
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: null,
          deskNumber: 0,
        },
        { new: true }
      );
    }

    return SendSuccess(res, "Category Created", []);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await DeskSchema.find(req.query)
      .sort({ number: 1 })
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
  removeEmployee,
  addEmployee,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
