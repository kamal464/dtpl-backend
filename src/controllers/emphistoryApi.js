const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');
const Emphistory = require('../models/emphistoryModel');

// Get Emphistory by ID
exports.getEmphistory = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const emphistory = await Emphistory.findByPk(id);

    if (!emphistory) {
      return res.status(404).json({
        status: false,
        message: 'Emphistory not found.',
      });
    }

    console.log('Query Result:', emphistory);

    return res.status(200).json(emphistory);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Emphistories
exports.getAllEmphistories = catchAsync(async (req, res) => {
    try {
      const { filtername, filtervalue } = req.headers;
  
      const whereCondition = filtername && filtervalue ? {
        [filtername]: filtervalue,
      } : {};
  
      const records = await Emphistory.findAll({
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
// Add Emphistory
exports.addEmphistory = catchAsync(async (req, res) => {
  try {
    const emphistoryData = req.body;

    if (!emphistoryData) {
      throw new Error("Emphistory data is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newEmphistory = await Emphistory.create({
      ...emphistoryData,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('Emphistory Added:', newEmphistory);

    return res.status(201).json({
      data: newEmphistory,
      status: true,
      message: 'Emphistory successfully added.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Emphistory
exports.updateEmphistory = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingEmphistory = await Emphistory.findByPk(id);

    if (!existingEmphistory) {
      return res.status(404).json({
        status: false,
        message: `No Emphistory with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Emphistory.update(updateData, {
      where: { id: existingEmphistory.id },
    });

    const updatedEmphistory = await Emphistory.findByPk(existingEmphistory.id);

    console.log('Emphistory Updated:', updatedEmphistory);

    return res.status(200).json({
      data: updatedEmphistory,
      status: true,
      message: 'Emphistory successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Emphistory
exports.deleteEmphistory = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedEmphistory = await Emphistory.findByPk(id);

    if (!deletedEmphistory) {
      return res.status(404).json({
        status: false,
        message: `No Emphistory with this id: ${id} found`,
      });
    }

    await Emphistory.destroy({
      where: { id: deletedEmphistory.id },
    });

    console.log('Emphistory Deleted:', deletedEmphistory);

    return res.status(200).json({
      data: deletedEmphistory,
      status: true,
      message: 'Emphistory successfully deleted.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get list of Emphistories
exports.getEmphistoryList = catchAsync(async (req, res) => {
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

    const emphistoryList = await Emphistory.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Emphistory List:', emphistoryList);

    return res.status(200).json({
      data: emphistoryList,
      status: true,
      message: 'Emphistory list retrieved successfully.',
    });
  
} catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});