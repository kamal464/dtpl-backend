const { Op } = require('sequelize');
const Contact = require('../models/contactModel'); // Assuming your Sequelize model is named Contact
const catchAsync = require("../utils/catchAsync");

exports.getContact = catchAsync(async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    throw new Error("Id is required");
  }

  const contact = await Contact.findByPk(id);

  if (!contact) {
    return res.status(404).json({
      status: false,
      message: 'Contact not found.',
    });
  }

  console.log('Contact Query Result:', contact);

  return res.status(200).json(contact);
});

exports.getAllContacts = catchAsync(async (req, res) => {
  try {
    const { filtername, filtervalue } = req.headers;

    // You can adjust the following query based on your requirements
    const whereCondition = filtername && filtervalue ? {
      [filtername]: filtervalue,
    } : {};

    const contacts = await Contact.findAll({
      where: whereCondition,
    });

    console.log('Contacts Query Result:', contacts);

    return res.status(200).json(contacts);
  } catch (e) {
    console.error('Error in Contact Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.addContact = catchAsync(async (req, res) => {
  try {
    const payload = req.body;

    // You can adjust the following code based on your payload structure and validation requirements
    const timeNow = Math.floor(new Date().getTime() / 1000);

    const newContact = await Contact.create({
      ...payload,
      sid: timeNow,
      rss: timeNow,
      lct: timeNow,
      sct: timeNow,
      lmt: timeNow,
      smt: timeNow,
    });

    console.log('New Contact:', newContact);

    return res.status(201).json({
      data: newContact,
      status: true,
      message: 'Contact added successfully.',
    });
  } catch (e) {
    console.error('Error in Contact Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.updateContact = catchAsync(async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingContact = await Contact.findByPk(id);

    if (!existingContact) {
      return res.status(404).json({
        status: false,
        message: `No contact with this id: ${id} found`,
      });
    }

    const timeNow = Math.floor(new Date().getTime() / 1000);

    updateData.lmt = timeNow;
    updateData.smt = timeNow;

    await Contact.update(updateData, {
      where: { id: existingContact.id },
    });

    const updatedContact = await Contact.findByPk(existingContact.id);

    console.log('Contact Updated:', updatedContact);

    return res.status(200).json({
      data: updatedContact,
      status: true,
      message: 'Contact successfully updated.',
    });
  } catch (e) {
    console.error('Error in Contact Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.deleteContact = catchAsync(async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      throw new Error("Id is required");
    }

    const existingContact = await Contact.findByPk(id);

    if (!existingContact) {
      return res.status(404).json({
        status: false,
        message: `No contact with this id: ${id} found`,
      });
    }

    await Contact.destroy({
      where: { id: existingContact.id },
    });

    console.log('Contact Deleted:', existingContact);

    return res.status(200).json(
      {
        data: existingContact,
        status: true,
        message: 'Contact successfully deleted.',
      }
    );
  } catch (e) {
    console.error('Error in Contact Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

exports.getListContacts = catchAsync(async (req, res) => {
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

    const contactList = await Contact.findAll({
      where: {
        [Op.and]: filterConditions,
      },
      order: orderConditions,
    });

    console.log('Contact List:', contactList);

    return res.status(200).json({
      data: contactList,
      status: true,
      message: 'Contact list retrieved successfully.',
    });
  } catch (e) {
    console.error('Error in Contact Controller:', e.message);
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});
