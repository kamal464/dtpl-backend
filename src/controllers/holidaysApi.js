const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");
const Holidays = require("../models/holidaysModel");

// Get Holiday by Id
exports.getHoliday = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const holiday = await Holidays.findByPk(id);

    if (!holiday) {
      return res.status(404).json({
        status: false,
        message: "Holiday not found.",
      });
    }

    console.log("Query Result:", holiday);

    return res.status(200).json({
      data: holiday,
      status: true,
      message: "Holiday retrieved successfully.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Holidays
exports.getAllHolidays = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? { [filtername]: filtervalue } : {};

    const holidays = await Holidays.findAll({
      where: whereCondition,
    });

    console.log("List:", holidays);

    return res.status(200).json(holidays);
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add Holiday
exports.addHoliday = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    if (!payload) {
      throw new Error("Payload is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newHoliday = await Holidays.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log("New Holiday:", newHoliday);

    return res.status(201).json({
      data: newHoliday,
      status: true,
      message: "Holiday added successfully.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Holiday
exports.updateHoliday = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingHoliday = await Holidays.findByPk(id);

    if (!existingHoliday) {
      return res.status(404).json({
        status: false,
        message: `No Holiday with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Holidays.update(updateData, {
      where: { id: existingHoliday.id },
    });

    const updatedHoliday = await Holidays.findByPk(existingHoliday.id);

    console.log("Holiday Updated:", updatedHoliday);

    return res.status(200).json({
      data: updatedHoliday,
      status: true,
      message: "Holiday successfully updated.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Holiday
exports.deleteHoliday = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedHoliday = await Holidays.findByPk(id);

    if (!deletedHoliday) {
      return res.status(404).json({
        status: false,
        message: `No Holiday with this id: ${id} found`,
      });
    }

    await Holidays.destroy({
      where: { id: deletedHoliday.id },
    });

    console.log("Holiday Deleted:", deletedHoliday);

    return res.status(200).json({
      data: deletedHoliday,
      status: true,
      message: "Holiday successfully deleted.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getHolidayList = catchAsync(async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { filters, order_by } = req.body;

    const filterConditions = filters.map((filter) => ({
      [filter.name]: filter.value,
    }));

    const orderConditions = order_by.map((orderBy) => [
      orderBy.name,
      orderBy.direction === "desc" ? "DESC" : "ASC",
    ]);

    const holidayList = await Holidays.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log("Holiday List:", holidayList);

    return res.status(200).json({
      data: holidayList,
      status: true,
      message: "Holiday list retrieved successfully.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
