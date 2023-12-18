const packageRouter = require("express").Router();
const settingsController = require("../controllers/settingApi");


packageRouter.post(
    "/get",
    settingsController.getRecord
  );
packageRouter.post(
    "/getall",
    settingsController.getAllRecords
  );
packageRouter.post(
    "/add",
    settingsController.addObject
  );
packageRouter.post(
    "/update",
    settingsController.updateObject
  );
packageRouter.post(
    "/delete",
    settingsController.deleteObject
  );
packageRouter.post(
    "/getlist",
    settingsController.getListSettings 
  );

  module.exports = packageRouter;