const packageRouter = require("express").Router();
const leaverulesController = require("../controllers/leaverulesApi");


packageRouter.post(
    "/get",
    leaverulesController.getLeaveRule
  );
packageRouter.post(
    "/getall",
  
    leaverulesController.getAllLeaveRules
  );
packageRouter.post(
    "/add",
    leaverulesController.addLeaveRule
  );
packageRouter.post(
    "/update",
    leaverulesController.updateLeaveRule
  );
packageRouter.post(
    "/delete",
    leaverulesController.deleteLeaveRule
  );
packageRouter.post(
    "/getlist",
    leaverulesController.getListLeaveRules
  );

  module.exports = packageRouter;