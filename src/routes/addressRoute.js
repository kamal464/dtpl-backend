const packageRouter = require("express").Router();
const addressController = require("../controllers/addressApi");


packageRouter.post(
    "/get",
    addressController.getRecord
  );
packageRouter.post(
    "/getall",
    addressController.getAllRecords
  );
packageRouter.post(
    "/add",
    addressController.addAddress
  );
packageRouter.post(
    "/update",
    addressController.updateObject
  );
packageRouter.post(
    "/delete",
    addressController.deleteObject
  );
packageRouter.post(
    "/getlist",
    addressController.getList
  );

  module.exports = packageRouter;