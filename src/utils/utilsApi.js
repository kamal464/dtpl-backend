const { Op } = require('sequelize');
const catchAsync = require("../utils/catchAsync");
const {
  Country,
  ReasonItem,
  Office,
  Department,
  Employee,
} = require('./utilsModel'); // Adjust the path accordingly

// Country Dropdown
exports.getCountryDropdown = catchAsync(async (req, res) => {
  try {
    const result = await Country.findAll({
      attributes: ['code', ['name', 'value']], // Adjust column names here
      order: [['code', 'ASC']],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// ReasonItem Dropdown
// ReasonItem Dropdown
exports.getReasonItemDropdown = catchAsync(async (req, res) => {
  try {
    const result = await ReasonItem.findAll({
      attributes: ['code', ['value', 'value']], // Adjust column names here
      where: {
        fkreasonid: sequelizeConnection.literal(`(SELECT id FROM reason WHERE name = '${req.headers.reason}')`),
      },
      order: [['serialno', 'ASC']],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Offices Dropdown
exports.getOfficesDropdown = catchAsync(async (req, res) => {
  try {
    const result = await Office.findAll({
      attributes: ['id', ['name', 'value']], // Adjust column names here
      where: { fkorgid: req.headers.fkorgid },
      order: [['id', 'ASC']],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Departments Dropdown
exports.getDepartmentsDropdown = catchAsync(async (req, res) => {
  try {
    const result = await Department.findAll({
      attributes: ['id', ['name', 'value']], // Adjust column names here
      where: { fkofficeid: req.headers.fkofficeid },
      order: [['id', 'ASC']],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Employees Dropdown
exports.getEmployeesDropdown = catchAsync(async (req, res) => {
  try {
    const result = await Employee.findAll({
      attributes: ['id', ['name', 'value']], // Adjust column names here
      where: { fkorgid: req.headers.fkorgid },
      order: [['id', 'ASC']],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});



// Codegen API
exports.runCodegenApi = catchAsync(async (req, res) => {
  try {
    // Assuming you have implemented these functions
    // Adjust paths accordingly
    await runCodegen(req.headers.tablenames);
    await runCodegenApiRoute();
    return res.status(200).json({
      status: true,
      message: 'Code generation completed successfully.',
    });
  } catch (error) {
    console.error('Error in Controller:', error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});
