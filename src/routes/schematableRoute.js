const packageRouter = require("express").Router();
const schematableController = require("../controllers/schematableApi");


packageRouter.post(
    "/get",
    schematableController.getRecord
  );
packageRouter.post(
    "/getall",
    schematableController.getAllRecords
  );
packageRouter.post(
    "/add",
    schematableController.addObject
  );
packageRouter.post(
    "/update",
    schematableController.updateObject
  );
packageRouter.post(
    "/delete",
    schematableController.deleteObject
  );
packageRouter.post(
    "/getlist",
    schematableController.getListSchemaTable 
  );

  module.exports = packageRouter;