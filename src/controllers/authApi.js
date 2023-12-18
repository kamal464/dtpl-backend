const { Op } = require('sequelize');
const Auth = require('../models/authModel'); // Assuming your Sequelize model is named Auth
const catchAsync = require("../utils/catchAsync");

// Get by ID
exports.getRecord = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const row = await Auth.findByPk(id);

    if (!row) {
      return res.status(404).json({
        status: false,
        message: 'Record not found.',
      });
    }

    console.log('Query Result:', row);

    return res.status(200).json({
      data: row,
      status: true,
      message: 'Record retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all
exports.getAllRecords = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const rows = await Auth.findAll({
      where: whereCondition,
    });

    console.log('Query Result:', rows);

    return res.status(200).json({
      data: rows,
      status: true,
      message: 'Records retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add
exports.addAuth = catchAsync(async (req, res) => {
    try {
      const obj = req.body;
  
      console.log(obj);
  
      if (!obj) {
        throw new Error("Object is required");
      }
  
      const timeNow = Math.floor(new Date().getTime() / 1000);
  
      console.log(timeNow);
  
      const newAuth = await Auth.create({
        ...obj,
        sid: timeNow,
        rss: timeNow,
        lct: timeNow,
        sct: timeNow,
        lmt: timeNow,
        smt: timeNow,
      });
  
      console.log('Authentication Record Added:', newAuth);
  
      return res.status(201).json({
        data: newAuth,
        status: true,
        message: 'Authentication record successfully added.',
      });
    } catch (e) {
      console.error('Error in Controller:', e.message);
      return res.status(500).json({
        status: false,
        message: e.message,
      });
    }
  });

// Update
exports.updateAuth = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingAuth = await Auth.findByPk(id);

    if (!existingAuth) {
      return res.status(404).json({
        status: false,
        message: `No authentication record with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Auth.update(updateData, {
      where: { id: existingAuth.id },
    });

    const updatedAuth = await Auth.findByPk(existingAuth.id);

    console.log('Authentication Record Updated:', updatedAuth);

    return res.status(200).json({
      data: updatedAuth,
      status: true,
      message: 'Authentication record successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete
exports.deleteAuth = catchAsync(async (req, res) => {
    try {
      const { id } = req.headers;
  
      if (!id) {
        throw new Error("Id is required");
      }
  
      const deleteAuth = await Auth.findByPk(id);
  
      if (!deleteAuth) {
        return res.status(404).json({
          status: false,
          message: `No authentication record with this id: ${id} found`,
        });
      }
  
      await Auth.destroy({
        where: { id: deleteAuth.id },
      });
  
      console.log('Authentication Record Deleted:', deleteAuth);
  
      return res.status(200).json({
        data: deleteAuth,
        status: true,
        message: 'Authentication record successfully deleted.',
      });
    } catch (e) {
      console.error('Error in Controller:', e.message);
      return res.status(500).json({
        status: false,
        message: e.message,
      });
    }
  });

// Get List
exports.getList = catchAsync(async (req, res) => {
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

    const list = await Auth.findAll({
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
