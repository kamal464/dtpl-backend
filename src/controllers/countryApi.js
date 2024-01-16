const { Op } = require('sequelize');
const Country = require('../models/countryModel'); // Assuming your Sequelize model is named Country
const catchAsync = require("../utils/catchAsync");

// Get by ID
exports.getCountry = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({
        status: false,
        message: 'Country not found.',
      });
    }

    console.log('Query Result:', country);

    return res.status(200).json(country);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all
exports.getAllCountries = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const countries = await Country.findAll({
      where: whereCondition,
    });

    console.log('Query Result:', countries);

    return res.status(200).json(countries);
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add
exports.addCountry = catchAsync(async (req, res) => {
    try {
      const payload = req.body;
  
      console.log(payload);
  
      if (!payload) {
        throw new Error("Payload is required");
      }
  
      const timeNow = Math.floor(new Date().getTime() / 1000);
  
      const newCountry = await Country.create({
        ...payload,
        sid: timeNow,
        rss: timeNow,
        lct: timeNow,
        sct: timeNow,
        lmt: timeNow,
        smt: timeNow,
      });
  
      console.log('New Country:', newCountry);
  
      return res.status(201).json({
        data: newCountry,
        status: true,
        message: 'Country added successfully.',
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
exports.updateCountry = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
   

    if (!id) {
      throw new Error("Id is required");
    }

    const existingCountry = await Country.findByPk(id);

    if (!existingCountry) {
      return res.status(404).json({
        status: false,
        message: `No country with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Country.update(updateData, {
      where: { id: existingCountry.id },
    });

    const updatedCountry = await Country.findByPk(existingCountry.id);

    console.log('Country Updated:', updatedCountry);

    return res.status(200).json({
      data: updatedCountry,
      status: true,
      message: 'Country successfully updated.',
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
exports.deleteCountry = catchAsync(async (req, res) => {
    try {
      const id = req.headers.id;
  
      if (!id) {
        throw new Error("Id is required");
      }
  
      const deletedCountry = await Country.findByPk(id);
  
      if (!deletedCountry) {
        return res.status(404).json({
          status: false,
          message: `No country with this id: ${id} found`,
        });
      }
  
      await Country.destroy({
        where: { id: deletedCountry.id },
      });
  
      console.log('Country Deleted:', deletedCountry);
  
      return res.status(200).json({
        data: deletedCountry,
        status: true,
        message: 'Country successfully deleted.',
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

    const list = await Country.findAll({
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
