const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const { getUser } = require("../Controlers/UserControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.get("/get", getUser);

module.exports = router;
