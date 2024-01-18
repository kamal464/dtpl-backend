const packageRouter = require("express").Router();
const resignapplicationController = require("../controllers/resignapplicationApi");


packageRouter.post(
    "/get",
    resignapplicationController.getResignApplication
  );
packageRouter.post(
    "/getall",
    resignapplicationController.getAllResignApplications
  );
packageRouter.post(
    "/add",
    resignapplicationController.addResignApplication
  );
packageRouter.post(
    "/update",
    resignapplicationController.updateResignApplication
  );
packageRouter.post(
    "/delete",
    resignapplicationController.deleteResignApplication
  );
packageRouter.post(
    "/getlist",
    resignapplicationController.getListResignApplications
  );

  module.exports = packageRouter;