const packageRouter = require("express").Router();
const reasonController = require("../controllers/reasonApi");


packageRouter.post(
    "/get",
    reasonController.getRecord
  );
packageRouter.post(
    "/getall",
    reasonController.getAllRecords
  );
packageRouter.post(
    "/add",
    reasonController.addObject
  );
packageRouter.post(
    "/update",
    reasonController.updateObject
  );
packageRouter.post(
    "/delete",
    reasonController.deleteObject
  );
packageRouter.post(
    "/getlist",
    reasonController.getListReason 
  );

  module.exports = packageRouter;