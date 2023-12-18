const packageRouter = require("express").Router();
const vfsController = require("../controllers/vfsApi");


packageRouter.post(
    "/get",
    vfsController.getRecord
  );
packageRouter.post(
    "/getall",
    vfsController.getAllRecords
  );
packageRouter.post(
    "/add",
    vfsController.addObject
  );
packageRouter.post(
    "/update",
    vfsController.updateObject
  );
packageRouter.post(
    "/delete",
    vfsController.deleteObject
  );
packageRouter.post(
    "/getlist",
    vfsController.getListVfs 
  );

  module.exports = packageRouter;