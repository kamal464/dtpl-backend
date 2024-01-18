const { Op } = require('sequelize');
const LeaveType = require('../models/leavetypesModel'); // Assuming your Sequelize model is named LeaveType
const catchAsync = require("../utils/catchAsync");

exports.getLeaveType = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const leaveType = await LeaveType.findByPk(id);

  if (!leaveType) {
    return res.status(404).json({
      status: false,
      message: 'Leave type not found.',
    });
  }

  console.log('Leave Type Query Result:', leaveType);

  return res.status(200).json(leaveType);
});

exports.getAllLeaveTypes = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const leaveTypes = await LeaveType.findAll({
      where: whereCondition,
    });

    console.log('Leave Types Query Result:', leaveTypes);

    return res.status(200).json(leaveTypes);
  } catch (e) {
    console.error('Error in Leave Type Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addLeaveType = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newLeaveType = await LeaveType.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Leave Type:', newLeaveType);

    return res.status(201).json(newLeaveType);
  } catch (e) {
    console.error('Error in Leave Type Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateLeaveType = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeaveType = await LeaveType.findByPk(id);

    if (!existingLeaveType) {
      return res.status(404).json({
        status: false,
        message: `No leave type with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await LeaveType.update(updateData, {
      where: { id: existingLeaveType.id },
    });

    const updatedLeaveType = await LeaveType.findByPk(existingLeaveType.id);

    console.log('Leave Type Updated:', updatedLeaveType);

    return res.status(200).json(updatedLeaveType);
  } catch (e) {
    console.error('Error in Leave Type Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteLeaveType = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeaveType = await LeaveType.findByPk(id);

    if (!existingLeaveType) {
      return res.status(404).json({
        status: false,
        message: `No leave type with this id: ${id} found`,
      });
    }

    await LeaveType.destroy({
      where: { id: existingLeaveType.id },
    });

    console.log('Leave Type Deleted:', existingLeaveType);

    return res.status(200).json(
      {
        data: existingLeaveType,
        status: true,
        message: 'Leave type successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Leave Type Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListLeaveTypes = catchAsync(async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { filters, order_by } = req.body;

    const filterConditions = filters
      .filter(filter => filter.value !== undefined) // Filter out undefined values
      .map(filter => ({
        [filter.name]: filter.value,
      }));

    const orderConditions = order_by.map(orderBy => [
      orderBy.name,
      orderBy.direction === 'desc' ? 'DESC' : 'ASC',
    ]);

    const leaveTypeList = await LeaveType.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Leave Type List:', leaveTypeList);

    return res.status(200).json({
      data: leaveTypeList,
      status: true,
      message: 'Leave type list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Leave Type Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
