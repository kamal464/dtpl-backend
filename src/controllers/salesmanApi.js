const { Op } = require('sequelize');
const Salesman = require('../models/salesmanModel'); // Assuming your Sequelize model is named Salesman
const catchAsync = require("../utils/catchAsync");

exports.getSalesman = catchAsync(async (req, res) => {
  const { salesid } = req.headers;

  if (!salesid) {
    throw new Error("Sales ID is required");
  }

  const salesman = await Salesman.findByPk(salesid);

  if (!salesman) {
    return res.status(404).json({
      status: false,
      message: 'Salesman not found.',
    });
  }

  console.log('Salesman Query Result:', salesman);

  return res.status(200).json(salesman);
});

exports.getAllSalesmen = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const salesmen = await Salesman.findAll({
      where: whereCondition,
    });

    console.log('Salesmen Query Result:', salesmen);

    return res.status(200).json(salesmen);
  } catch (e) {
    console.error('Error in Salesman Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addSalesman = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const newSalesman = await Salesman.create(payload);

    console.log('New Salesman:', newSalesman);

    return res.status(201).json(newSalesman);
  } catch (e) {
    console.error('Error in Salesman Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateSalesman = catchAsync(async (req, res) => {
  try {
    const { salesid, ...updateData } = req.body;

    if (!salesid) {
      throw new Error("Sales ID is required");
    }

    const existingSalesman = await Salesman.findByPk(salesid);

    if (!existingSalesman) {
      return res.status(404).json({
        status: false,
        message: `No salesman with this Sales ID: ${salesid} found`,
      });
    }

    await Salesman.update(updateData, {
      where: { salesid: existingSalesman.salesid },
    });

    const updatedSalesman = await Salesman.findByPk(existingSalesman.salesid);

    console.log('Salesman Updated:', updatedSalesman);

    return res.status(200).json({
      data: updatedSalesman,
      status: true,
      message: 'Salesman successfully updated.',
    });
  } catch (e) {
    console.error('Error in Salesman Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteSalesman = catchAsync(async (req, res) => {
  try {
    const { salesid } = req.headers;

    if (!salesid) {
      throw new Error("Sales ID is required");
    }

    const existingSalesman = await Salesman.findByPk(salesid);

    if (!existingSalesman) {
      return res.status(404).json({
        status: false,
        message: `No salesman with this Sales ID: ${salesid} found`,
      });
    }

    await Salesman.destroy({
      where: { salesid: existingSalesman.salesid },
    });

    console.log('Salesman Deleted:', existingSalesman);

    return res.status(200).json(
      {
        data: existingSalesman,
        status: true,
        message: 'Salesman successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Salesman Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListSalesmen = catchAsync(async (req, res) => {
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

    const salesmanList = await Salesman.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Salesman List:', salesmanList);

    return res.status(200).json({
      data: salesmanList,
      status: true,
      message: 'Salesman list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Salesman Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
