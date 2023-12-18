const packageRouter = require("express").Router();
const reasonitemController = require("../controllers/reasonitemApi");


packageRouter.post(
    "/get",
    reasonitemController.getRecord
  );
packageRouter.post(
    "/getall",
    reasonitemController.getAllRecords
  );
packageRouter.post(
    "/add",
    reasonitemController.addObject
  );
packageRouter.post(
    "/update",
    reasonitemController.updateObject
  );
packageRouter.post(
    "/delete",
    reasonitemController.deleteObject
  );
packageRouter.post(
    "/getlist",
    reasonitemController.getListReasonItem 
  );

  module.exports = packageRouter;