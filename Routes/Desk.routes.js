const express = require("express");

const {
  create,
  read,
  Delete,
  update,
  addEmployee,
  removeEmployee,
} = require("../Controlers/Desk.controler");
const router = express.Router();

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);
router.put("/update/:id", update);
router.post("/add-employee", addEmployee);
router.post("/remove-employee", removeEmployee);

module.exports = router;
