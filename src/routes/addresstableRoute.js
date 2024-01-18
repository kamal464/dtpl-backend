const packageRouter = require("express").Router();
const addresstableController = require("../controllers/addresstableApi.js");


packageRouter.post(
    "/get",
    addresstableController.getAddress
  );
packageRouter.post(
    "/getall",
    addresstableController.getAllAddresses
  );
packageRouter.post(
    "/add",
    addresstableController.addAddress
  );
packageRouter.post(
    "/update",
    addresstableController.updateAddress
  );
packageRouter.post(
    "/delete",
    addresstableController.deleteAddress
  );
packageRouter.post(
    "/getlist",
    addresstableController.getListAddresses
  );

  module.exports = packageRouter;