const { Op } = require('sequelize');
const Identification = require('../models/identificationModel'); // Assuming your Sequelize model is named Identification
const catchAsync = require("../utils/catchAsync");

exports.getRecord = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const row = await Identification.findByPk(id);

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

    const rows = await Identification.findAll({
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

exports.addObject = catchAsync(async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    // Assuming payload is sent in the request body

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    console.log(timeNow);
    const newRecord = await Identification.create({
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

exports.updateObject = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Identification.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Identification.update(updateData, {
      where: { id: existingRecord.id },
    });

    const updatedRecord = await Identification.findByPk(existingRecord.id);

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

exports.deleteObject = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Identification.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    await Identification.destroy({
      where: { id: existingRecord.id },
    });

    console.log('Record Deleted:', existingRecord);

    return res.status(200).json(
      {
        data: existingRecord,
        status: true,
        message: 'Record successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListIdentification = catchAsync(async (req, res) => {
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

    const list = await Identification.findAll({
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
