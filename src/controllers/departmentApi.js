const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');
const Department = require('../models/departmentModel');

// Get Department by Id
exports.getDepartment = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({
        status: false,
        message: 'Department not found.',
      });
    }

    console.log('Query Result:', department);

    return res.status(200).json(
      ddepartment

    );
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Departments
exports.getAllDepartments = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? { [filtername]: filtervalue } : {};

    const departments = await Department.findAll({
      where: whereCondition,
    });

    console.log('List:', departments);

    return res.status(200).json(departments);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add Department
exports.addDepartment = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    if (!payload) {
      throw new Error("Payload is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newDepartment = await Department.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Department:', newDepartment);

    return res.status(201).json({
      data: newDepartment,
      status: true,
      message: 'Department added successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Department
exports.updateDepartment = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingDepartment = await Department.findByPk(id);

    if (!existingDepartment) {
      return res.status(404).json({
        status: false,
        message: `No Department with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Department.update(updateData, {
      where: { id: existingDepartment.id },
    });

    const updatedDepartment = await Department.findByPk(existingDepartment.id);

    console.log('Department Updated:', updatedDepartment);

    return res.status(200).json({
      data: updatedDepartment,
      status: true,
      message: 'Department successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Department
exports.deleteDepartment = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedDepartment = await Department.findByPk(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        status: false,
        message: `No Department with this id: ${id} found`,
      });
    }

    await Department.destroy({
      where: { id: deletedDepartment.id },
    });

    console.log('Department Deleted:', deletedDepartment);

    return res.status(200).json({
      data: deletedDepartment,
      status: true,
      message: 'Department successfully deleted.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});


exports.getDepartmentList = catchAsync(async (req, res) => {
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

    const departmentList = await Department.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Department List:', departmentList);

    return res.status(200).json({
      data: departmentList,
      status: true,
      message: 'Department list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
