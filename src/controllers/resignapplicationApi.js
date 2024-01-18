const { Op } = require('sequelize');
const ResignApplication = require('../models/resignapplicationModel'); // Assuming your Sequelize model is named ResignApplication
const catchAsync = require("../utils/catchAsync");

exports.getResignApplication = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const resignApplication = await ResignApplication.findByPk(id);

  if (!resignApplication) {
    return res.status(404).json({
      status: false,
      message: 'Resignation application not found.',
    });
  }

  console.log('Resignation Application Query Result:', resignApplication);

  return res.status(200).json(resignApplication);
});

exports.getAllResignApplications = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const resignApplications = await ResignApplication.findAll({
      where: whereCondition,
    });

    console.log('Resignation Applications Query Result:', resignApplications);

    return res.status(200).json(resignApplications);
  } catch (e) {
    console.error('Error in Resignation Application Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addResignApplication = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newResignApplication = await ResignApplication.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Resignation Application:', newResignApplication);

    return res.status(201).json(newResignApplication);
  } catch (e) {
    console.error('Error in Resignation Application Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateResignApplication = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingResignApplication = await ResignApplication.findByPk(id);

    if (!existingResignApplication) {
      return res.status(404).json({
        status: false,
        message: `No resignation application with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await ResignApplication.update(updateData, {
      where: { id: existingResignApplication.id },
    });

    const updatedResignApplication = await ResignApplication.findByPk(existingResignApplication.id);

    console.log('Resignation Application Updated:', updatedResignApplication);

    return res.status(200).json(updatedResignApplication);
  } catch (e) {
    console.error('Error in Resignation Application Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteResignApplication = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingResignApplication = await ResignApplication.findByPk(id);

    if (!existingResignApplication) {
      return res.status(404).json({
        status: false,
        message: `No resignation application with this id: ${id} found`,
      });
    }

    await ResignApplication.destroy({
      where: { id: existingResignApplication.id },
    });

    console.log('Resignation Application Deleted:', existingResignApplication);

    return res.status(200).json(
      {
        data: existingResignApplication,
        status: true,
        message: 'Resignation application successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Resignation Application Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListResignApplications = catchAsync(async (req, res) => {
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

    const resignApplicationList = await ResignApplication.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Resignation Application List:', resignApplicationList);

    return res.status(200).json({
      data: resignApplicationList,
      status: true,
      message: 'Resignation application list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Resignation Application Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
