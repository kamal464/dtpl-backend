const { Op } = require('sequelize');
const LeavePolicy = require('../models/leavepoliciesModel'); // Assuming your Sequelize model is named LeavePolicy
const catchAsync = require("../utils/catchAsync");

exports.getLeavePolicy = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const leavePolicy = await LeavePolicy.findByPk(id);

  if (!leavePolicy) {
    return res.status(404).json({
      status: false,
      message: 'Leave policy not found.',
    });
  }

  console.log('Leave Policy Query Result:', leavePolicy);

  return res.status(200).json(leavePolicy);
});

exports.getAllLeavePolicies = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const leavePolicies = await LeavePolicy.findAll({
      where: whereCondition,
    });

    console.log('Leave Policies Query Result:', leavePolicies);

    return res.status(200).json(leavePolicies);
  } catch (e) {
    console.error('Error in Leave Policy Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addLeavePolicy = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newLeavePolicy = await LeavePolicy.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Leave Policy:', newLeavePolicy);

    return res.status(201).json(
    newLeavePolicy
    
    );
  } catch (e) {
    console.error('Error in Leave Policy Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateLeavePolicy = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeavePolicy = await LeavePolicy.findByPk(id);

    if (!existingLeavePolicy) {
      return res.status(404).json({
        status: false,
        message: `No leave policy with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await LeavePolicy.update(updateData, {
      where: { id: existingLeavePolicy.id },
    });

    const updatedLeavePolicy = await LeavePolicy.findByPk(existingLeavePolicy.id);

    console.log('Leave Policy Updated:', updatedLeavePolicy);

    return res.status(200).json(
updatedLeavePolicy,
     
    );
  } catch (e) {
    console.error('Error in Leave Policy Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteLeavePolicy = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingLeavePolicy = await LeavePolicy.findByPk(id);

    if (!existingLeavePolicy) {
      return res.status(404).json({
        status: false,
        message: `No leave policy with this id: ${id} found`,
      });
    }

    await LeavePolicy.destroy({
      where: { id: existingLeavePolicy.id },
    });

    console.log('Leave Policy Deleted:', existingLeavePolicy);

    return res.status(200).json(
      
       existingLeavePolicy,
      
      
    );
  } catch (e) {
    console.error('Error in Leave Policy Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListLeavePolicies = catchAsync(async (req, res) => {
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

    const leavePolicyList = await LeavePolicy.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Leave Policy List:', leavePolicyList);

    return res.status(200).json(
     leavePolicyList
      
    );
  } catch (e) {
    console.error('Error in Leave Policy Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
