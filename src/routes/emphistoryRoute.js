const packageRouter = require("express").Router();
const emphistoryController = require("../controllers/emphistoryApi");


packageRouter.post(
    "/get",
    emphistoryController.getEmphistory
  );
packageRouter.post(
    "/getall",
    emphistoryController.getAllEmphistories
  );
packageRouter.post(
    "/add",
    emphistoryController.addEmphistory
  );
packageRouter.post(
    "/update",
    emphistoryController.updateEmphistory
  );
packageRouter.post(
    "/delete",
    emphistoryController.deleteEmphistory
  );
packageRouter.post(
    "/getlist",
    emphistoryController.getEmphistoryList 
  );

  module.exports = packageRouter;