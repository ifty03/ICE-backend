const Department = require("../models/department.model");
const {
  createDepartmentService,
  deleteDepartmentService,
  updateDepartmentService,
  getDepartmentByIdService,
} = require("../services/department.service");
// for property post
exports.createDepartment = async (req, res) => {

  try {
    const newDepartment = await createDepartmentService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newDepartment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Department
exports.getDepartment = async (req, res) => {
  try {
    const page = (parseInt(req.query.page)-1) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const departments = await Department.find({})
      .skip(page * limit)
      .limit(limit);

    const total = await Department.countDocuments({});
    res.status(200).json({
      status: "success",
      data: departments,
      total: total,
      page: page,
      limit: limit,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Department
exports.deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteDepartmentService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update Department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await updateDepartmentService(id, req.body);

    if (!department.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update department ",
      error: error.message,
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getDepartmentByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific Department
exports.getSpecificDepartment = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let departments = await Department.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Department.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: departments,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
