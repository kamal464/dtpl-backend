const packageRouter = require("express").Router();
const emppersonalController = require("../controllers/emppersonalApi");


packageRouter.post(
    "/get",
    emppersonalController.getRecord
  );
packageRouter.post(
    "/getall",
    emppersonalController.getAllRecords
  );
packageRouter.post(
    "/add",
    emppersonalController.addObject
  );
packageRouter.post(
    "/update",
    emppersonalController.updateObject
  );
packageRouter.post(
    "/delete",
    emppersonalController.deleteObject
  );
packageRouter.post(
    "/getlist",
    emppersonalController.getListPersonal 
  );

  module.exports = packageRouter;