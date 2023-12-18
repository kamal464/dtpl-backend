const packageRouter = require("express").Router();
const empresignController = require("../controllers/empresignApi");


packageRouter.post(
    "/get",
    empresignController.getRecord
  );
packageRouter.post(
    "/getall",
    empresignController.getAllRecords
  );
packageRouter.post(
    "/add",
    empresignController.addEmpresign
  );
packageRouter.post(
    "/update",
    empresignController.updateEmpresign
  );
packageRouter.post(
    "/delete",
    empresignController.deleteEmpresign
  );
packageRouter.post(
    "/getlist",
    empresignController.getEmpresignList 
  );

  module.exports = packageRouter;