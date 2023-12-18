const packageRouter = require("express").Router();
const empprofileController = require("../controllers/empprofileApi");


packageRouter.post(
    "/get",
    empprofileController.getRecord
  );
packageRouter.post(
    "/getall",
    empprofileController.getAllRecords
  );
packageRouter.post(
    "/add",
    empprofileController.addRecord
  );
packageRouter.post(
    "/update",
    empprofileController.updateRecord
  );
packageRouter.post(
    "/delete",
    empprofileController.deleteRecord
  );
packageRouter.post(
    "/getlist",
    empprofileController.getList 
  );

  module.exports = packageRouter;