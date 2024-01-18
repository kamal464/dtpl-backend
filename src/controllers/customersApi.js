const { Op } = require('sequelize');
const Customer = require('../models/customersModel'); // Assuming your Sequelize model is named Customer
const catchAsync = require("../utils/catchAsync");

exports.getCustomer = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const customer = await Customer.findByPk(id);

  if (!customer) {
    return res.status(404).json({
      status: false,
      message: 'Customer not found.',
    });
  }

  console.log('Customer Query Result:', customer);

  return res.status(200).json(customer);
});

exports.getAllCustomers = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const customers = await Customer.findAll({
      where: whereCondition,
    });

    console.log('Customers Query Result:', customers);

    return res.status(200).json(customers);
  } catch (e) {
    console.error('Error in Customer Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addCustomer = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newCustomer = await Customer.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Customer:', newCustomer);

    return res.status(201).json({
      data: newCustomer,
      status: true,
      message: 'Customer added successfully.',
    });
  } catch (e) {
    console.error('Error in Customer Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateCustomer = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingCustomer = await Customer.findByPk(id);

    if (!existingCustomer) {
      return res.status(404).json({
        status: false,
        message: `No customer with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Customer.update(updateData, {
      where: { id: existingCustomer.id },
    });

    const updatedCustomer = await Customer.findByPk(existingCustomer.id);

    console.log('Customer Updated:', updatedCustomer);

    return res.status(200).json({
      data: updatedCustomer,
      status: true,
      message: 'Customer successfully updated.',
    });
  } catch (e) {
    console.error('Error in Customer Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteCustomer = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingCustomer = await Customer.findByPk(id);

    if (!existingCustomer) {
      return res.status(404).json({
        status: false,
        message: `No customer with this id: ${id} found`,
      });
    }

    await Customer.destroy({
      where: { id: existingCustomer.id },
    });

    console.log('Customer Deleted:', existingCustomer);

    return res.status(200).json(
      {
        data: existingCustomer,
        status: true,
        message: 'Customer successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Customer Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListCustomers = catchAsync(async (req, res) => {
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

    const customerList = await Customer.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Customer List:', customerList);

    return res.status(200).json({
      data: customerList,
      status: true,
      message: 'Customer list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Customer Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
