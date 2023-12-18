const packageRouter = require("express").Router();
const empdependentController = require("../controllers/empdependentApi");


packageRouter.post(
    "/get",
    empdependentController.getRecord
  );
packageRouter.post(
    "/getall",
    empdependentController.getAll
  );
packageRouter.post(
    "/add",
    empdependentController.addObject
  );
packageRouter.post(
    "/update",
    empdependentController.updateObject
  );
packageRouter.post(
    "/delete",
    empdependentController.deleteObjectById
  );
packageRouter.post(
    "/getlist",
    empdependentController.getList 
  );

  module.exports = packageRouter;