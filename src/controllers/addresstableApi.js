const { Op } = require('sequelize');
const AddressTable = require('../models/addresstableModel.js'); // Assuming your Sequelize model is named AddressTable
const catchAsync = require("../utils/catchAsync");

exports.getAddress = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const address = await AddressTable.findByPk(id);

  if (!address) {
    return res.status(404).json({
      status: false,
      message: 'Address not found.',
    });
  }

  console.log('Address Query Result:', address);

  return res.status(200).json(address);
});

exports.getAllAddresses = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const addresses = await AddressTable.findAll({
      where: whereCondition,
    });

    console.log('Addresses Query Result:', addresses);

    return res.status(200).json(addresses);
  } catch (e) {
    console.error('Error in Address Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addAddress = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newAddress = await AddressTable.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Address:', newAddress);

    return res.status(201).json({
      data: newAddress,
      status: true,
      message: 'Address added successfully.',
    });
  } catch (e) {
    console.error('Error in Address Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateAddress = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingAddress = await AddressTable.findByPk(id);

    if (!existingAddress) {
      return res.status(404).json({
        status: false,
        message: `No address with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await AddressTable.update(updateData, {
      where: { id: existingAddress.id },
    });

    const updatedAddress = await AddressTable.findByPk(existingAddress.id);

    console.log('Address Updated:', updatedAddress);

    return res.status(200).json({
      data: updatedAddress,
      status: true,
      message: 'Address successfully updated.',
    });
  } catch (e) {
    console.error('Error in Address Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteAddress = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingAddress = await AddressTable.findByPk(id);

    if (!existingAddress) {
      return res.status(404).json({
        status: false,
        message: `No address with this id: ${id} found`,
      });
    }

    await AddressTable.destroy({
      where: { id: existingAddress.id },
    });

    console.log('Address Deleted:', existingAddress);

    return res.status(200).json(
      {
        data: existingAddress,
        status: true,
        message: 'Address successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Address Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListAddresses = catchAsync(async (req, res) => {
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

    const addressList = await AddressTable.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Address List:', addressList);

    return res.status(200).json({
      data: addressList,
      status: true,
      message: 'Address list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Address Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
