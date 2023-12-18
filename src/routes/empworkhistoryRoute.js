const packageRouter = require("express").Router();
const empworkhistoryController = require("../controllers/empworkhistoryApi");


packageRouter.post(
    "/get",
    empworkhistoryController.getRecord
  );
packageRouter.post(
    "/getall",
    empworkhistoryController.getAllRecords
  );
packageRouter.post(
    "/add",
    empworkhistoryController.addObject
  );
packageRouter.post(
    "/update",
    empworkhistoryController.updateObject
  );
packageRouter.post(
    "/delete",
    empworkhistoryController.deleteObject
  );
packageRouter.post(
    "/getlist",
    empworkhistoryController.getListWorkHistory 
  );

  module.exports = packageRouter;