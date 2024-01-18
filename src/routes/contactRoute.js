const packageRouter = require("express").Router();
const contactController = require("../controllers/contactApi");


packageRouter.post(
    "/get",
    contactController.getContact
  );
packageRouter.post(
    "/getall",
    contactController.getAllContacts
  );
packageRouter.post(
    "/add",
    contactController.addContact
  );
packageRouter.post(
    "/update",
    contactController.updateContact
  );
packageRouter.post(
    "/delete",
    contactController.deleteContact
  );
packageRouter.post(
    "/getlist",
    contactController.getListContacts
  );

  module.exports = packageRouter;