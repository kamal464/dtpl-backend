const packageRouter = require("express").Router();
const officeController = require("../controllers/officeApi");


packageRouter.post(
    "/get",
    officeController.getRecord
  );
packageRouter.post(
    "/getall",
    officeController.getAllRecords
  );
packageRouter.post(
    "/add",
    officeController.addObject
  );
packageRouter.post(
    "/update",
    officeController.updateObject
  );
packageRouter.post(
    "/delete",
    officeController.deleteObject
  );
packageRouter.post(
    "/getlist",
    officeController.getListOffice 
  );

  module.exports = packageRouter;