const packageRouter = require("express").Router();
const countryController = require("../controllers/countryApi");


packageRouter.post(
    "/get",
    countryController.getCountry
  );
packageRouter.post(
    "/getall",
    countryController.getAllCountries
  );
packageRouter.post(
    "/add",
    countryController.addCountry
  );
packageRouter.post(
    "/update",
    countryController.updateCountry
  );
packageRouter.post(
    "/delete",
    countryController.deleteCountry
  );
packageRouter.post(
    "/getlist",
    countryController.getList
  );

  module.exports = packageRouter;