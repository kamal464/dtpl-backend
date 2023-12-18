const packageRouter = require("express").Router();
const webmenuController = require("../controllers/webmenuApi");


packageRouter.post(
    "/get",
    webmenuController.getRecord
  );
packageRouter.post(
    "/getall",
    webmenuController.getAllRecords
  );
packageRouter.post(
    "/add",
    webmenuController.addObject
  );
packageRouter.post(
    "/update",
    webmenuController.updateObject
  );
packageRouter.post(
    "/delete",
    webmenuController.deleteObject
  );
packageRouter.post(
    "/getlist",
    webmenuController.getListWebmenu 
  );

  module.exports = packageRouter;