const Department = require("../models/department.model");

exports.createDepartmentService = async (data) => {
    const department = await Department.create(data);
    return department;
};
exports.deleteDepartmentService = async (id) => {
    const department = await Department.deleteOne({ _id: id });
    return department;
};

exports.updateDepartmentService = async (id, data) => {
    const department = await Department.updateOne({ _id: id }, data);
    return department;
};
exports.getDepartmentByIdService = async (id) => {
    const department = await Department.findOne({ _id: id });
    return department;
};
