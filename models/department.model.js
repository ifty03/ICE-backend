const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
        name: { type: String },
        thumbnail: { type: String },
        totalCredit: { type: Number },
        seatAvailable: { type: Number },
        status: { type: String },
        description: { type: String },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
