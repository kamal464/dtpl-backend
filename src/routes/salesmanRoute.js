const packageRouter = require("express").Router();
const salesmanController = require("../controllers/salesmanApi");


packageRouter.post(
    "/get",
    salesmanController.getSalesman
  );
packageRouter.post(
    "/getall",
    salesmanController.getAllSalesmen
  );
packageRouter.post(
    "/add",
    salesmanController.addSalesman
  );
packageRouter.post(
    "/update",
    salesmanController.updateSalesman
  );
packageRouter.post(
    "/delete",
    salesmanController.deleteSalesman
  );
packageRouter.post(
    "/getlist",
    salesmanController.getListSalesmen
  );

  module.exports = packageRouter;