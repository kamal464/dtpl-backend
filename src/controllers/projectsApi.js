const { Op } = require('sequelize');
const Project = require('../models/projectsModel'); // Assuming your Sequelize model is named Project
const catchAsync = require("../utils/catchAsync");

exports.getProject = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      status: false,
      message: 'Project not found.',
    });
  }

  console.log('Project Query Result:', project);

  return res.status(200).json(project);
});

exports.getAllProjects = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const projects = await Project.findAll({
      where: whereCondition,
    });

    console.log('Projects Query Result:', projects);

    return res.status(200).json(projects);
  } catch (e) {
    console.error('Error in Project Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addProject = catchAsync(async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload)

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newProject = await Project.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Project:', newProject);

    return res.status(201).json(newProject);
  } catch (e) {
    console.error('Error in Project Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateProject = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingProject = await Project.findByPk(id);

    if (!existingProject) {
      return res.status(404).json({
        status: false,
        message: `No project with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Project.update(updateData, {
      where: { id: existingProject.id },
    });

    const updatedProject = await Project.findByPk(existingProject.id);

    console.log('Project Updated:', updatedProject);

    return res.status(200).json(updatedProject);
  } catch (e) {
    console.error('Error in Project Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteProject = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingProject = await Project.findByPk(id);

    if (!existingProject) {
      return res.status(404).json({
        status: false,
        message: `No project with this id: ${id} found`,
      });
    }

    await Project.destroy({
      where: { id: existingProject.id },
    });

    console.log('Project Deleted:', existingProject);

    return res.status(200).json(
      {
        data: existingProject,
        status: true,
        message: 'Project successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Project Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListProjects = catchAsync(async (req, res) => {
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

    const projectList = await Project.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Project List:', projectList);

    return res.status(200).json({
      data: projectList,
      status: true,
      message: 'Project list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Project Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
