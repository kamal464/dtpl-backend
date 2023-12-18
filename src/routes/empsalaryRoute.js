const packageRouter = require("express").Router();
const empsalaryController = require("../controllers/empsalaryApi");


packageRouter.post(
    "/get",
    empsalaryController.getRecord
  );
packageRouter.post(
    "/getall",
    empsalaryController.getAllRecords
  );
packageRouter.post(
    "/add",
    empsalaryController.addObject
  );
packageRouter.post(
    "/update",
    empsalaryController.updateObject
  );
packageRouter.post(
    "/delete",
    empsalaryController.deleteObject
  );
packageRouter.post(
    "/getlist",
    empsalaryController.getListSalary 
  );

  module.exports = packageRouter;