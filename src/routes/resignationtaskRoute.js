const packageRouter = require("express").Router();
const resignationtaskController = require("../controllers/resignationtaskApi");


packageRouter.post(
    "/get",
    resignationtaskController.getResignationTask
  );
packageRouter.post(
    "/getall",
    resignationtaskController.getAllResignationTasks
  );
packageRouter.post(
    "/add",
    resignationtaskController.addResignationTask
  );
packageRouter.post(
    "/update",
    resignationtaskController.updateResignationTask
  );
packageRouter.post(
    "/delete",
    resignationtaskController.deleteResignationTask
  );
packageRouter.post(
    "/getlist",
    resignationtaskController.getListResignationTasks 
  );

  module.exports = packageRouter;