// const { mqsqlConnection ,testSequelizeConnection,sequelizeConnection} = require("../lib/mqsqlLib");
const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');
const _ = require("lodash");
const Empcontact = require('../models/empcontactModel');

// 
exports.getRecord = catchAsync (async (req, res, next) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const row = await Empcontact.findByPk(id);

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

// 

exports.getAll = catchAsync( async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    let rows;

    if (!filtername) {
      rows = await Empcontact.findAll();
    } else {
      rows = await Empcontact.findAll({
        where: { [filtername]: filtervalue },
      });
    }

    console.log('Query Results:', rows);

    return res.status(200).json({
      data: rows,
      status: true,
      message: 'Package Successfully Created.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error.',
    });
  }
});

exports.addEmpcontact = catchAsync (async (req, res) => {
  try {
    const  obj  = req.body;
    console.log(obj)

    if (!obj) {
      throw new Error("Object is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);;
    
    console.log(timeNow)

    const newObj = await Empcontact.create({
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


exports.updateEmpcontact = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingObject = await Empcontact.findByPk(id);

    if (!existingObject) {
      return res.status(404).json({
        status: false,
        message: `No Object with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Empcontact.update(updateData, {
      where: { id: existingObject.id },
    });

    const updatedObject = await Empcontact.findByPk(existingObject.id);

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

    const deleteObject = await Empcontact.findByPk(id);

    if (!deleteObject) {
      return res.status(404).json({
        status: false,
        message: `No Object with this id: ${id} found`,
      });
    }

    await Empcontact.destroy({
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

    const list = await Empcontact.findAll({
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