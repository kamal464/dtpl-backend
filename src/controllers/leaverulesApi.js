const { Op } = require('sequelize');
const LeaveRule = require('../models/leaverulesModel'); // Assuming your Sequelize model is named LeaveRule
const catchAsync = require("../utils/catchAsync");

exports.getLeaveRule = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const leaveRule = await LeaveRule.findByPk(id);

  if (!leaveRule) {
    return res.status(404).json({
      status: false,
      message: 'Leave rule not found.',
    });
  }

  console.log('Leave Rule Query Result:', leaveRule);

  return res.status(200).json(leaveRule);
});

exports.getAllLeaveRules = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const leaveRules = await LeaveRule.findAll({
      where: whereCondition,
    });

    console.log('Leave Rules Query Result:', leaveRules);

    return res.status(200).json(leaveRules);
  } catch (e) {
    console.error('Error in Leave Rule Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addLeaveRule = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newLeaveRule = await LeaveRule.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Leave Rule:', newLeaveRule);

    return res.status(201).json(newLeaveRule);
  } catch (e) {
    console.error('Error in Leave Rule Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateLeaveRule = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeaveRule = await LeaveRule.findByPk(id);

    if (!existingLeaveRule) {
      return res.status(404).json({
        status: false,
        message: `No leave rule with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await LeaveRule.update(updateData, {
      where: { id: existingLeaveRule.id },
    });

    const updatedLeaveRule = await LeaveRule.findByPk(existingLeaveRule.id);

    console.log('Leave Rule Updated:', updatedLeaveRule);

    return res.status(200).json(updatedLeaveRule);
  } catch (e) {
    console.error('Error in Leave Rule Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteLeaveRule = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeaveRule = await LeaveRule.findByPk(id);

    if (!existingLeaveRule) {
      return res.status(404).json({
        status: false,
        message: `No leave rule with this id: ${id} found`,
      });
    }

    await LeaveRule.destroy({
      where: { id: existingLeaveRule.id },
    });

    console.log('Leave Rule Deleted:', existingLeaveRule);

    return res.status(200).json(
      {
        data: existingLeaveRule,
        status: true,
        message: 'Leave rule successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Leave Rule Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListLeaveRules = catchAsync(async (req, res) => {
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

    const leaveRuleList = await LeaveRule.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Leave Rule List:', leaveRuleList);

    return res.status(200).json({
      data: leaveRuleList,
      status: true,
      message: 'Leave rule list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Leave Rule Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
