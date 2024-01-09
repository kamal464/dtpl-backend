const packageRouter = require("express").Router();
const utilsController = require("../utils/utilsApi");


packageRouter.post(
    "/dropdown/country",
    utilsController.getCountryDropdown
  );
packageRouter.post(
    "/dropdown/reason",
    utilsController.getReasonItemDropdown
  );
packageRouter.post(
    "/dropdown/office",
    utilsController.getOfficesDropdown
  );
packageRouter.post(
    "/dropdown/department",
    utilsController.getDepartmentsDropdown
  );
packageRouter.post(
    "/dropdown/employee",
    utilsController.getEmployeesDropdown
  );
packageRouter.post(
    "/codegen/api",
    utilsController.runCodegenApi 
  );

  module.exports = packageRouter;