const packageRouter = require("express").Router();
const schematableattrController = require("../controllers/schematableattrApi");


packageRouter.post(
    "/get",
    schematableattrController.getRecord
  );
packageRouter.post(
    "/getall",
    schematableattrController.getAllRecords
  );
packageRouter.post(
    "/add",
    schematableattrController.addObject
  );
packageRouter.post(
    "/update",
    schematableattrController.updateObject
  );
packageRouter.post(
    "/delete",
    schematableattrController.deleteObject
  );
packageRouter.post(
    "/getlist",
    schematableattrController.getListSchemaTableAttr 
  );

  module.exports = packageRouter;