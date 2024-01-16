const { Op } = require('sequelize');
const Empeducation = require('../models/empeducationModel'); // Adjust the path based on your project structure
const catchAsync = require("../utils/catchAsync");

exports.getEmpeducation = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const record = await Empeducation.findByPk(id);

    if (!record) {
      return res.status(404).json({
        status: false,
        message: 'Record not found.',
      });
    }

    console.log('Query Result:', record);

    return res.status(200).json(record);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getAllEmpeducation = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const records = await Empeducation.findAll({
      where: whereCondition,
    });

    console.log('Query Result:', records);

    return res.status(200).json(records);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addEmpeducation = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      throw new Error("Payload is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newRecord = await Empeducation.create({
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
      message: 'Record successfully added.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateEmpeducation = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Empeducation.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Empeducation.update(updateData, {
      where: { id: existingRecord.id },
    });

    const updatedRecord = await Empeducation.findByPk(existingRecord.id);

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

exports.deleteEmpeducation = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingRecord = await Empeducation.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({
        status: false,
        message: `No record with this id: ${id} found`,
      });
    }

    await Empeducation.destroy({
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

exports.getEmpeducationList = catchAsync(async (req, res) => {
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

    const recordList = await Empeducation.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Record List:', recordList);

    return res.status(200).json({
      data: recordList,
      status: true,
      message:
      'Record list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
