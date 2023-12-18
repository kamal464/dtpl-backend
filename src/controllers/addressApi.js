const { Op } = require('sequelize');
const address = require('../models/addressModel'); // Assuming your Sequelize model is named Address
const catchAsync = require("../utils/catchAsync");

exports.getRecord = catchAsync(async (req, res,next) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const row = await address.findByPk(id);

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
});


exports.getAllRecords = catchAsync(async (req, res) => {
    try {
      const { filtername, filtervalue } = req.headers;
  
      // You can adjust the following query based on your requirements
      const whereCondition = filtername && filtervalue ? {
        [filtername]: filtervalue,
      } : {};
  
      const rows = await address.findAll({
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
  

  exports.addAddress = catchAsync(async (req, res) => {
    try {
      const payload = req.body; 
      console.log(payload)
      // Assuming payload is sent in the request body
  
      // You can adjust the following code based on your payload structure and validation requirements
      const timeNow = Math.floor(new Date().getTime() / 1000);
    
      console.log(timeNow)
      const newAddress = await address.create(
        {
            ...payload,
            sid:timeNow,
      rss:timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
        }
      );
  
      console.log('New Address:', newAddress);
  
      return res.status(201).json({
        data: newAddress,
        status: true,
        message: 'Address added successfully.',
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
  
      const existingObject = await address.findByPk(id);
  
      if (!existingObject) {
        return res.status(404).json({
          status: false,
          message: `No object with this id: ${id} found`,
        });
      }
  
      const timeNow = Math.floor(new Date().getTime() / 1000);
  
      updateData.lmt = timeNow;
      updateData.smt = timeNow;
  
      await address.update(updateData, {
        where: { id: existingObject.id },
      });
  
      const updatedObject = await address.findByPk(existingObject.id);
  
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
  
  exports.deleteObject = catchAsync(async (req, res) => {
    try {
      const { id } = req.headers;
  
      if (!id) {
        throw new Error("Id is required");
      }
  
      const existingObject = await address.findByPk(id);
  
      if (!existingObject) {
        return res.status(404).json({
          status: false,
          message: `No object with this id: ${id} found`,
        });
      }
  
      await address .destroy({
        where: { id: existingObject.id },
      });
  
      console.log('Object Deleted:', existingObject);
  
      return res.status(200).json(
        {
            data: existingObject,
            status: true,
            message: 'Object successfully deleted.',
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
  
      const list = await address.findAll({
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

