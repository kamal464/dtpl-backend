const packageRouter = require("express").Router();
const identificationController = require("../controllers/identificationApi");


packageRouter.post(
    "/get",
    identificationController.getRecord
  );
packageRouter.post(
    "/getall",
    identificationController.getAllRecords
  );
packageRouter.post(
    "/add",
    identificationController.addObject
  );
packageRouter.post(
    "/update",
    identificationController.updateObject
  );
packageRouter.post(
    "/delete",
    identificationController.deleteObject
  );
packageRouter.post(
    "/getlist",
    identificationController.getListIdentification 
  );

  module.exports = packageRouter;