const packageRouter = require("express").Router();
const attendencerulesController = require("../controllers/attendencerulesApi");


packageRouter.post(
    "/get",
    attendencerulesController.getAttendancerule
  );
packageRouter.post(
    "/getall",
    attendencerulesController.getAllAttendancerules
  );
packageRouter.post(
    "/add",
    attendencerulesController.addAttendancerule
  );
packageRouter.post(
    "/update",
    attendencerulesController.updateAttendancerule
  );
packageRouter.post(
    "/delete",
    attendencerulesController.deleteAttendancerule
  );
packageRouter.post(
    "/getlist",
    attendencerulesController.getAttendanceruleList
  );

  module.exports = packageRouter;