const packageRouter = require("express").Router();
const leavetypesController = require("../controllers/leavetypesApi");


packageRouter.post(
    "/get",
    leavetypesController.getLeaveType
  );
packageRouter.post(
    "/getall",
  
    leavetypesController.getAllLeaveTypes
  );
packageRouter.post(
    "/add",
    leavetypesController.addLeaveType
  );
packageRouter.post(
    "/update",
    leavetypesController.updateLeaveType
  );
packageRouter.post(
    "/delete",
    leavetypesController.deleteLeaveType
  );
packageRouter.post(
    "/getlist",
    leavetypesController.getListLeaveTypes
  );

  module.exports = packageRouter;