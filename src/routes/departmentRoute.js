const packageRouter = require("express").Router();
const departmentController = require("../controllers/departmentApi");


packageRouter.post(
    "/get",
    departmentController.getDepartment
  );
packageRouter.post(
    "/getall",
    departmentController.getAllDepartments
  );
packageRouter.post(
    "/add",
    departmentController.addDepartment
  );
packageRouter.post(
    "/update",
    departmentController.updateDepartment
  );
packageRouter.post(
    "/delete",
    departmentController.deleteDepartment
  );
packageRouter.post(
    "/getlist",
    departmentController.getDepartmentList 
  );

  module.exports = packageRouter;