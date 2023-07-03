const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  department: {
    type: String,
    required: true,
    enum: ["Tech", "Marketing", "Operations"],
  },
  salary: { type: String, required: true },
  userId: { type: String, required: true },
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = { EmployeeModel };
