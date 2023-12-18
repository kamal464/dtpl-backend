const packageRouter = require("express").Router();
const empcontactController = require("../controllers/empcontactApi");


packageRouter.post(
    "/get",
    empcontactController.getRecord
  );
packageRouter.post(
    "/getall",
    empcontactController.getAll
  );
packageRouter.post(
    "/add",
    empcontactController.addEmpcontact
  );
packageRouter.post(
    "/update",
    empcontactController.updateEmpcontact
  );
packageRouter.post(
    "/delete",
    empcontactController.deleteObjectById
  );
packageRouter.post(
    "/getlist",
    empcontactController.getList 
  );

  module.exports = packageRouter;