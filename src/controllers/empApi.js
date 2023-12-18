const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');
const Employee = require('../models/empModel');

// Get Employee by ID
exports.getEmployee = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found.',
      });
    }

    console.log('Query Result:', employee);

    return res.status(200).json({
      data: employee,
      status: true,
      message: 'Employee retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Employees
exports.getAllEmployees = catchAsync(async (req, res) => {
  try {
    // Implement logic to get all employees
    // ...

    return res.status(200).json({
      // Return the list of employees
      data: [],
      status: true,
      message: 'Employees retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add Employee
exports.addEmployee = catchAsync(async (req, res) => {
  try {
    const employeeData = req.body;

    if (!employeeData) {
      throw new Error("Employee data is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newEmployee = await Employee.create({
      ...employeeData,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('Employee Added:', newEmployee);

    return res.status(201).json({
      data: newEmployee,
      status: true,
      message: 'Employee successfully added.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Employee
exports.updateEmployee = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingEmployee = await Employee.findByPk(id);

    if (!existingEmployee) {
      return res.status(404).json({
        status: false,
        message: `No Employee with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Employee.update(updateData, {
      where: { id: existingEmployee.id },
    });

    const updatedEmployee = await Employee.findByPk(existingEmployee.id);

    console.log('Employee Updated:', updatedEmployee);

    return res.status(200).json({
      data: updatedEmployee,
      status: true,
      message: 'Employee successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Employee
exports.deleteEmployee = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedEmployee = await Employee.findByPk(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        status: false,
        message: `No Employee with this id: ${id} found`,
      });
    }

    await Employee.destroy({
      where: { id: deletedEmployee.id },
    });

    console.log('Employee Deleted:', deletedEmployee);

    return res.status(200).json({
      data: deletedEmployee,
      status: true,
      message: 'Employee successfully deleted.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get list of Employees
exports.getEmployeeList = catchAsync(async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      const { filters, order_by } = req.body;
  
      const filterConditions = filters.map(filter => ({
        [filter.name]: filter.value,
      }));
  
      const orderConditions = order_by.map(orderBy => [
        orderBy.name,
        orderBy.direction === 'desc' ? 'DESC' : 'ASC',
      ]);
  
      const employeeList = await Employee.findAll({
        where: {
          [Op.and]: filterConditions,
        },
        order: orderConditions,
      });
  
      console.log('Employee List:', employeeList);
  
      return res.status(200).json({
        data: employeeList,
        status: true,
        message: 'Employee list retrieved successfully.',
      });
    } catch (e) {
      console.error('Error in Controller:', e.message);
      return res.status(500).json({
        status: false,
        message: e.message,
      });
    }
  });
  