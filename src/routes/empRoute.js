const packageRouter = require("express").Router();
const empController = require("../controllers/empApi");


packageRouter.post(
    "/get",
    empController.getEmployee
  );
packageRouter.post(
    "/getall",
    empController.getAllEmployees
  );
packageRouter.post(
    "/add",
    empController.addEmployee
  );
packageRouter.post(
    "/update",
    empController.updateEmployee
  );
packageRouter.post(
    "/delete",
    empController.deleteEmployee
  );
packageRouter.post(
    "/getlist",
    empController.getEmployeeList 
  );

  module.exports = packageRouter;