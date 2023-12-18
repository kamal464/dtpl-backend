const packageRouter = require("express").Router();
const schemacolumnController = require("../controllers/schemacolumnApi");


packageRouter.post(
    "/get",
    schemacolumnController.getRecord
  );
packageRouter.post(
    "/getall",
    schemacolumnController.getAllRecords
  );
packageRouter.post(
    "/add",
    schemacolumnController.addObject
  );
packageRouter.post(
    "/update",
    schemacolumnController.updateObject
  );
packageRouter.post(
    "/delete",
    schemacolumnController.deleteObject
  );
packageRouter.post(
    "/getlist",
    schemacolumnController.getListSchemaColumn 
  );

  module.exports = packageRouter;