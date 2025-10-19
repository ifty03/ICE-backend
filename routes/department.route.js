const express = require("express");
const {
  createDepartment,
  getDepartment,
  deleteDepartment,
  updateDepartment,
  getDepartmentById,
  getSpecificDepartment,
} = require("../controllers/department.controller");
const router = express.Router();

router.post("/addDepartment", createDepartment);
router.get("/getDepartment", getDepartment);
router.get("/getDepartmentById/:id", getDepartmentById);
router.delete("/deleteDepartment/:id", deleteDepartment);
router.route("/updateDepartment/:id").patch(updateDepartment);
router.route("/specific").get(getSpecificDepartment);

module.exports = router;
