const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");
const Attendancerules = require("../models/attendencerulesModel");

// Get Attendancerule by Id
exports.getAttendancerule = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const attendancerule = await Attendancerules.findByPk(id);

    if (!attendancerule) {
      return res.status(404).json({
        status: false,
        message: "Attendancerule not found.",
      });
    }

    console.log("Query Result:", attendancerule);

    return res.status(200).json(attendancerule);
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Get all Attendancerules
exports.getAllAttendancerules = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    const whereCondition = filtername && filtervalue ? { [filtername]: filtervalue } : {};

    const attendancerules = await Attendancerules.findAll({
      where: whereCondition,
    });

    console.log("List:", attendancerules);

    return res.status(200).json(attendancerules);
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Add Attendancerule
exports.addAttendancerule = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    if (!payload) {
      throw new Error("Payload is required");
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newAttendancerule = await Attendancerules.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log("New Attendancerule:", newAttendancerule);

    return res.status(201).json({
      data: newAttendancerule,
      status: true,
      message: "Attendancerule added successfully.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Update Attendancerule
exports.updateAttendancerule = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingAttendancerule = await Attendancerules.findByPk(id);

    if (!existingAttendancerule) {
      return res.status(404).json({
        status: false,
        message: `No Attendancerule with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Attendancerules.update(updateData, {
      where: { id: existingAttendancerule.id },
    });

    const updatedAttendancerule = await Attendancerules.findByPk(existingAttendancerule.id);

    console.log("Attendancerule Updated:", updatedAttendancerule);

    return res.status(200).json({
      data: updatedAttendancerule,
      status: true,
      message: "Attendancerule successfully updated.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

// Delete Attendancerule
exports.deleteAttendancerule = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const deletedAttendancerule = await Attendancerules.findByPk(id);

    if (!deletedAttendancerule) {
      return res.status(404).json({
        status: false,
        message: `No Attendancerule with this id: ${id} found`,
      });
    }

    await Attendancerules.destroy({
      where: { id: deletedAttendancerule.id },
    });

    console.log("Attendancerule Deleted:", deletedAttendancerule);

    return res.status(200).json({
      data: deletedAttendancerule,
      status: true,
      message: "Attendancerule successfully deleted.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getAttendanceruleList = catchAsync(async (req, res) => {
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

    const attendanceruleList = await Attendancerules.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log("Attendancerule List:", attendanceruleList);

    return res.status(200).json({
      data: attendanceruleList,
      status: true,
      message: "Attendancerule list retrieved successfully.",
    });
  } catch (e) {
    console.error("Error in Controller:", e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
