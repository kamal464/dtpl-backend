const packageRouter = require("express").Router();
const schemaTableController = require("../controllers/schemaTable");

packageRouter.post(
  "/get",
  schemaTableController.getRecord
);

packageRouter.post(
  "/getall",
  schemaTableController.getAll
);

packageRouter.post(
  "/add",
  schemaTableController.addObject
)
packageRouter.post(
  "/update",
  schemaTableController.updateObject
)
packageRouter.post(
  "/delete",
  schemaTableController.deleteObjectById
)
packageRouter.post(
  "/getlist",
  schemaTableController.getList
)



module.exports = packageRouter;
