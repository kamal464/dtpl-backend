const packageRouter = require("express").Router();
const customersController = require("../controllers/customersApi.js");


packageRouter.post(
    "/get",
    customersController.getCustomer
  );
packageRouter.post(
    "/getall",
    customersController.getAllCustomers
  );
packageRouter.post(
    "/add",
    customersController.addCustomer
  );
packageRouter.post(
    "/update",
    customersController.updateCustomer
  );
packageRouter.post(
    "/delete",
    customersController.deleteCustomer
  );
packageRouter.post(
    "/getlist",
    customersController.getListCustomers
  );

  module.exports = packageRouter;