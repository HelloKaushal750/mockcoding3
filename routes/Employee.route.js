const express = require("express");
const { EmployeeModel } = require("../models/Employee.model");

const EmployeeController = express.Router();

EmployeeController.get("/", async (req, res) => {
  try {
    if (
      !req.query.page &&
      !req.query.department &&
      !req.query.search &&
      !req.query.sortBy
    ) {
      const employee = await EmployeeModel.find({ userId: req.body.userId });
      if (employee.length > 0) {
        res.status(200).json(employee);
      } else {
        res.status(200).json({ message: "No Employee Found!" });
      }
    } else {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const department = req.query.department;
      const search = req.query.search;
      const sortBy = req.query.sortBy;

      const filter = {};
      if (department) {
        filter.department = department;
      }
      if (search) {
        filter.firstname = { $regex: search, $options: "i" };
      }

      try {
        const data = await EmployeeModel.find(filter)
          .skip((page - 1) * limit)
          .limit(limit);
        res.status(200).json(data);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
        console.log(error);
      }
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

EmployeeController.get("/:id", async (req,res)=>{
  const {id} = req.params;
  const employee = await EmployeeModel.findOne({
    userId:req.body.userId,
    _id:id
  })
  res.json(employee)
})

EmployeeController.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, department, salary, userId } = req.body;
    const employee = new EmployeeModel({
      firstname,
      lastname,
      email,
      department,
      salary,
      userId,
    });
    await employee.save();
    res.status(200).json({ message: "Employee Data Created" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

EmployeeController.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await EmployeeModel.findOneAndDelete({
      _id: id,
      userId: req.body.userId,
    });
    if (deleteEmployee) {
      res.status(200).json({ message: "Employee Deleted Successfully" });
    } else {
      res.status(200).json({ message: "No employee found!" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

EmployeeController.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateEmployee = await EmployeeModel.findOneAndUpdate(
      {
        _id: id,
        userId: req.body.userId,
      },
      {
        ...req.body,
      }
    );
    if (updateEmployee) {
      res.status(200).json({ message: "Employee Updated Successfully" });
    } else {
      res.status(200).json({ message: "No employee found!" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = { EmployeeController };
