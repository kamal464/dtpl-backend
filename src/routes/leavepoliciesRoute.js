const packageRouter = require("express").Router();
const leavepoliciesController = require("../controllers/leavepoliciesApi");


packageRouter.post(
    "/get",
    leavepoliciesController.getLeavePolicy
  );
packageRouter.post(
    "/getall",
  
    leavepoliciesController.getAllLeavePolicies
  );
packageRouter.post(
    "/add",
    leavepoliciesController.addLeavePolicy
  );
packageRouter.post(
    "/update",
    leavepoliciesController.updateLeavePolicy
  );
packageRouter.post(
    "/delete",
    leavepoliciesController.deleteLeavePolicy
  );
packageRouter.post(
    "/getlist",
    leavepoliciesController.getListLeavePolicies 
  );

  module.exports = packageRouter;