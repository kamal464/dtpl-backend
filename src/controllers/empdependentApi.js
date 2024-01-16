// const { mqsqlConnection ,testSequelizeConnection,sequelizeConnection} = require("../lib/mqsqlLib");
const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');
const _ = require("lodash");
const empdependent = require('../models/empdependentModel');

// 
exports.getRecord = catchAsync (async (req, res, next) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const row = await empdependent.findByPk(id);

    if (!row) {
      return res.status(404).json({
        status: false,
        message: 'Record not found.',
      });
    }

    console.log('Query Result:', row);

    return res.status(200).json(row);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// 

exports.getAll = catchAsync( async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    let rows;

    if (!filtername) {
      rows = await empdependent.findAll();
    } else {
      rows = await empdependent.findAll({
        where: { [filtername]: filtervalue },
      });
    }

    console.log('Query Results:', rows);

    return res.status(200).json(rows);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error.',
    });
  }
});

exports.addObject = catchAsync (async (req, res) => {
  try {
    const  obj  = req.body;
    console.log(obj)

    if (!obj) {
      throw new Error("Object is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);;
    
    console.log(timeNow)

    const newObj = await empdependent.create({
      ...obj,
      sid:timeNow,
      rss:timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('Object Added:', newObj);

    return res.status(201).json({
      data: newObj,
      status: true,
      message: 'Object successfully added.',
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

    const existingObject = await empdependent.findByPk(id);

    if (!existingObject) {
      return res.status(404).json({
        status: false,
        message: `No Object with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await empdependent.update(updateData, {
      where: { id: existingObject.id },
    });

    const updatedObject = await empdependent.findByPk(existingObject.id);

    console.log('Object Updated:', updatedObject);

    return res.status(200).json({
      data: updatedObject,
      status: true,
      message: 'Object successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});


exports.deleteObjectById = catchAsync(async (req, res) => {
  try {
    const id = req.headers.id;

    if (!id) {
      throw new Error("Id is required");
    }

    const deleteObject = await empdependent.findByPk(id);

    if (!deleteObject) {
      return res.status(404).json({
        status: false,
        message: `No Object with this id: ${id} found`,
      });
    }

    await empdependent.destroy({
      where: { id: deleteObject.id },
    });

    console.log('Object Deleted:', deleteObject);

    return res.status(200).json({
      data: deleteObject,
      status: true,
      message: 'Object successfully deleted.',
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

    const filterConditions = filters.map(filter => ({
      [filter.name]: filter.value,
    }));

    const orderConditions = order_by.map(orderBy => [
      orderBy.name,
      orderBy.direction === 'desc' ? 'DESC' : 'ASC',
    ]);

    const list = await empdependent.findAll({
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