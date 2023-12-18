const packageRouter = require("express").Router();
const authController = require("../controllers/authApi");


packageRouter.post(
    "/get",
    authController.getRecord
  );
packageRouter.post(
    "/getall",
    authController.getAllRecords
  );
packageRouter.post(
    "/add",
    authController.addAuth
  );
packageRouter.post(
    "/update",
    authController.updateAuth
  );
packageRouter.post(
    "/delete",
    authController.deleteAuth
  );
packageRouter.post(
    "/getlist",
    authController.getList
  );

  module.exports = packageRouter;