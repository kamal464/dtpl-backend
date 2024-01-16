const { Op } = require('sequelize');
const Empprofile = require('../models/empprofileModel'); // Assuming your Sequelize model is named Empprofile
const catchAsync = require("../utils/catchAsync");

exports.getRecord = catchAsync(async (req, res, next) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const row = await Empprofile.findByPk(id);

  if (!row) {
    return res.status(404).json({
      status: false,
      message: 'Record not found.',
    });
  }

  console.log('Query Result:', row);

  return res.status(200).json(row);
});

exports.getAllRecords = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const rows = await Empprofile.findAll({
      where: whereCondition,
    });

    console.log('Query Result:', rows);

    return res.status(200).json(rows);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addRecord = catchAsync(async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    // Assuming payload is sent in the request body

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    console.log(timeNow);
    const newRecord = await Empprofile.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Record:', newRecord);

    return res.status(201).json({
      data: newRecord,
      status: true,
      message: 'Record added successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateRecord = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Empprofile.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Empprofile.update(updateData, {
      where: { id: existingRecord.id },
    });

    const updatedRecord = await Empprofile.findByPk(existingRecord.id);

    console.log('Record Updated:', updatedRecord);

    return res.status(200).json({
      data: updatedRecord,
      status: true,
      message: 'Record successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteRecord = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Empprofile.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    await Empprofile.destroy({
      where: { id: existingRecord.id },
    });

    console.log('Record Deleted:', existingRecord);

    return res.status(200).json({
      data: existingRecord,
      status: true,
      message: 'Record successfully deleted.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getList = catchAsync(async (req, res) => {
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

    const list = await Empprofile.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('List:', list);

    return res.status(200).json({
      data: list,
      status: true,
      message: 'List retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
