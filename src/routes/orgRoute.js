const packageRouter = require("express").Router();
const orgController = require("../controllers/orgApi");


packageRouter.post(
    "/get",
    orgController.getRecord
  );
packageRouter.post(
    "/getall",
  
    orgController.getAllRecords
  );
packageRouter.post(
    "/add",
    orgController.addObject
  );
packageRouter.post(
    "/update",
    orgController.updateObject
  );
packageRouter.post(
    "/delete",
    orgController.deleteObject
  );
packageRouter.post(
    "/getlist",
    orgController.getListOrg 
  );

  module.exports = packageRouter;