const { Op } = require('sequelize');
const empresign = require('../models/empresignModel'); // Assuming your Sequelize model is named Empresign
const catchAsync = require('../utils/catchAsync');

exports.getRecord = catchAsync(async (req, res, next) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const row = await empresign.findByPk(id);

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

    const rows = await empresign.findAll({
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

exports.addEmpresign = catchAsync(async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    // Assuming payload is sent in the request body

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    console.log(timeNow);
    const newEmpresign = await empresign.create(
      {
        ...payload,
        sid: timeNow,
        rss: timeNow,
        lct: timeNow,
        sct: timeNow,
        lmt: timeNow,
        smt: timeNow,
      }
    );

    console.log('New Empresign:', newEmpresign);

    return res.status(201).json({
      data: newEmpresign,
      status: true,
      message: 'Empresign added successfully.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateEmpresign = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingEmpresign = await empresign.findByPk(id);

    if (!existingEmpresign) {
      return res.status(404).json({
        status: false,
        message: `No empresign with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await empresign.update(updateData, {
      where: { id: existingEmpresign.id },
    });

    const updatedEmpresign = await empresign.findByPk(existingEmpresign.id);

    console.log('Empresign Updated:', updatedEmpresign);

    return res.status(200).json({
      data: updatedEmpresign,
      status: true,
      message: 'Empresign successfully updated.',
    });
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteEmpresign = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingEmpresign = await empresign.findByPk(id);

    if (!existingEmpresign) {
      return res.status(404).json({
        status: false,
        message: `No empresign with this id: ${id} found`,
      });
    }

    await empresign.destroy({
      where: { id: existingEmpresign.id },
    });

    console.log('Empresign Deleted:', existingEmpresign);

    return res.status(200).json(
      {
        data: existingEmpresign,
        status: true,
        message: 'Empresign successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json(
      {
        status: false,
        message: e.message,
      }
    );
  }
});

exports.getEmpresignList = catchAsync(async (req, res) => {
  try {
    const { filter } = req.body;

    // You can adjust the following query based on your requirements
    const rows = await empresign.findAll({
      where: filter,
    });

    console.log('Query Result:', rows);

    return res.status(200).json(
      {
        data: rows,
        status: true,
        message: 'Empresign list retrieved successfully.',
      }
    );
  } catch (e) {
    console.error('Error in Controller:', e.message);
    return res.status(500).json(
      {
        status: false,
        message: e.message,
      }
    );
  }
});
