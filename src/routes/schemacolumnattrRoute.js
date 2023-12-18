const packageRouter = require("express").Router();
const schemacolumnattrController = require("../controllers/schemacolumnattrApi");


packageRouter.post(
    "/get",
    schemacolumnattrController.getRecord
  );
packageRouter.post(
    "/getall",
    schemacolumnattrController.getAllRecords
  );
packageRouter.post(
    "/add",
    schemacolumnattrController.addObject
  );
packageRouter.post(
    "/update",
    schemacolumnattrController.updateObject
  );
packageRouter.post(
    "/delete",
    schemacolumnattrController.deleteObject
  );
packageRouter.post(
    "/getlist",
    schemacolumnattrController.getListSchemaColumnAttr 
  );

  module.exports = packageRouter;