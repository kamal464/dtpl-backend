const { Op } = require('sequelize');
const Empofficial = require('../models/empofficialModel'); // Assuming your Sequelize model is named Empofficial
const catchAsync = require("../utils/catchAsync");

// Get Empofficial by ID
exports.getEmpofficial = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const empofficial = await Empofficial.findByPk(id);

    if (!empofficial) {
      return res.status(404).json({
        status: false,
        message: 'Empofficial not found.',
      });
    }

    console.log('Query Result:', empofficial);

    return res.status(200).json(empofficial);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Empofficials
exports.getAllEmpofficials = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const empofficials = await Empofficial.findAll({
      where: whereCondition,
    });

    console.log('Query Result:', empofficials);

    return res.status(200).json(empofficials);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add Empofficial
exports.addEmpofficial = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      throw new Error("Empofficial data is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newEmpofficial = await Empofficial.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('Empofficial Added:', newEmpofficial);

    return res.status(201).json({
      data: newEmpofficial,
      status: true,
      message: 'Empofficial successfully added.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Empofficial
exports.updateEmpofficial = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingEmpofficial = await Empofficial.findByPk(id);

    if (!existingEmpofficial) {
      return res.status(404).json({
        status: false,
        message: `No Empofficial with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Empofficial.update(updateData, {
      where: { id: existingEmpofficial.id },
    });

    const updatedEmpofficial = await Empofficial.findByPk(existingEmpofficial.id);

    console.log('Empofficial Updated:', updatedEmpofficial);

    return res.status(200).json({
      data: updatedEmpofficial,
      status: true,
      message: 'Empofficial successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Empofficial
exports.deleteEmpofficial = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedEmpofficial = await Empofficial.findByPk(id);

    if (!deletedEmpofficial) {
      return res.status(404).json({
        status: false,
        message: `No Empofficial with this id: ${id} found`,
      });
    }

    await Empofficial.destroy({
      where: { id: deletedEmpofficial.id },
    });

    console.log('Empofficial Deleted:', deletedEmpofficial);

    return res.status(200).json({
      data: deletedEmpofficial,
      status: true,
      message: 'Empofficial successfully deleted.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get list of Empofficial
exports.getEmpofficialList = catchAsync(async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      const { filters, order_by } = req.body;
  
      const filterConditions = filters
        .filter(filter => filter.value !== undefined)
        .map(filter => ({
          [filter.name]: filter.value,
        }));
  
      const orderConditions = order_by.map(orderBy => [
        orderBy.name,
        orderBy.direction === 'desc' ? 'DESC' : 'ASC',
      ]);
  
      const empofficialList = await Empofficial.findAll({
        where: {
          [Op.and]: filterConditions,
        },
        order: orderConditions,
      });
  
      console.log('Empofficial List:', empofficialList);
  
      return res.status(200).json({
        data: empofficialList,
        status: true,
        message: 'Empofficial list retrieved successfully.',
      });
    } catch (e) {
      console.error('Error in Controller:', e.message);
      return res.status(500).json({
        status: false,
        message: e.message,
      });
    }
  });