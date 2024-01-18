const { Op } = require('sequelize');
const WorkingDays = require('../models/workingdaysModel'); // Assuming your Sequelize model is named WorkingDays
const catchAsync = require("../utils/catchAsync");

exports.getWorkingDay = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const workingDay = await WorkingDays.findByPk(id);

  if (!workingDay) {
    return res.status(404).json({
      status: false,
      message: 'Working day not found.',
    });
  }

  console.log('Working Day Query Result:', workingDay);

  return res.status(200).json(workingDay);
});

exports.getAllWorkingDays = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const workingDays = await WorkingDays.findAll({
      where: whereCondition,
    });

    console.log('Working Days Query Result:', workingDays);

    return res.status(200).json(workingDays);
  } catch (e) {
    console.error('Error in Working Day Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addWorkingDay = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newWorkingDay = await WorkingDays.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Working Day:', newWorkingDay);

    return res.status(201).json(newWorkingDay);
  } catch (e) {
    console.error('Error in Working Day Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateWorkingDay = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingWorkingDay = await WorkingDays.findByPk(id);

    if (!existingWorkingDay) {
      return res.status(404).json({
        status: false,
        message: `No working day with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await WorkingDays.update(updateData, {
      where: { id: existingWorkingDay.id },
    });

    const updatedWorkingDay = await WorkingDays.findByPk(existingWorkingDay.id);

    console.log('Working Day Updated:', updatedWorkingDay);

    return res.status(200).json({
      data: updatedWorkingDay,
      status: true,
      message: 'Working day successfully updated.',
    });
  } catch (e) {
    console.error('Error in Working Day Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteWorkingDay = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingWorkingDay = await WorkingDays.findByPk(id);

    if (!existingWorkingDay) {
      return res.status(404).json({
        status: false,
        message: `No working day with this id: ${id} found`,
      });
    }

    await WorkingDays.destroy({
      where: { id: existingWorkingDay.id },
    });

    console.log('Working Day Deleted:', existingWorkingDay);

    return res.status(200).json(
      existingWorkingDay
    );
  } catch (e) {
    console.error('Error in Working Day Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListWorkingDays = catchAsync(async (req, res) => {
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

    const workingDayList = await WorkingDays.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Working Day List:', workingDayList);

    return res.status(200).json(workingDayList);
  } catch (e) {
    console.error('Error in Working Day Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
