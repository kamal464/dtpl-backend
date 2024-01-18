const packageRouter = require("express").Router();
const workingdaysController = require("../controllers/workingdaysApi");


packageRouter.post(
    "/get",
    workingdaysController.getWorkingDay
  );
packageRouter.post(
    "/getall",
    workingdaysController.getAllWorkingDays
  );
packageRouter.post(
    "/add",
    workingdaysController.addWorkingDay
  );
packageRouter.post(
    "/update",
    workingdaysController.updateWorkingDay
  );
packageRouter.post(
    "/delete",
    workingdaysController.deleteWorkingDay
  );
packageRouter.post(
    "/getlist",
    workingdaysController.getListWorkingDays
  );

  module.exports = packageRouter;