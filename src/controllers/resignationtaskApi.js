const { Op } = require('sequelize');
const ResignationTask = require('../models/resignationtaskModel'); // Assuming your Sequelize model is named ResignationTask
const catchAsync = require("../utils/catchAsync");

exports.getResignationTask = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const resignationTask = await ResignationTask.findByPk(id);

  if (!resignationTask) {
    return res.status(404).json({
      status: false,
      message: 'Resignation task not found.',
    });
  }

  console.log('Resignation Task Query Result:', resignationTask);

  return res.status(200).json(resignationTask);
});

exports.getAllResignationTasks = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const resignationTasks = await ResignationTask.findAll({
      where: whereCondition,
    });

    console.log('Resignation Tasks Query Result:', resignationTasks);

    return res.status(200).json(resignationTasks);
  } catch (e) {
    console.error('Error in Resignation Task Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addResignationTask = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newResignationTask = await ResignationTask.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Resignation Task:', newResignationTask);

    return res.status(201).json(newResignationTask);
  } catch (e) {
    console.error('Error in Resignation Task Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateResignationTask = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingResignationTask = await ResignationTask.findByPk(id);

    if (!existingResignationTask) {
      return res.status(404).json({
        status: false,
        message: `No resignation task with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await ResignationTask.update(updateData, {
      where: { id: existingResignationTask.id },
    });

    const updatedResignationTask = await ResignationTask.findByPk(existingResignationTask.id);

    console.log('Resignation Task Updated:', updatedResignationTask);

    return res.status(200).json({
      data: updatedResignationTask,
      status: true,
      message: 'Resignation task successfully updated.',
    });
  } catch (e) {
    console.error('Error in Resignation Task Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteResignationTask = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingResignationTask = await ResignationTask.findByPk(id);

    if (!existingResignationTask) {
      return res.status(404).json({
        status: false,
        message: `No resignation task with this id: ${id} found`,
      });
    }

    await ResignationTask.destroy({
      where: { id: existingResignationTask.id },
    });

    console.log('Resignation Task Deleted:', existingResignationTask);

    return res.status(200).json(
      {
        data: existingResignationTask,
        status: true,
        message: 'Resignation task successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Resignation Task Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListResignationTasks = catchAsync(async (req, res) => {
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

    const resignationTaskList = await ResignationTask.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Resignation Task List:', resignationTaskList);

    return res.status(200).json({
      data: resignationTaskList,
      status: true,
      message: 'Resignation task list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Resignation Task Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
