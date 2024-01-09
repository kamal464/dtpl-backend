const packageRouter = require("express").Router();
const holidaysControllers = require("../controllers/holidaysApi");


packageRouter.post(
    "/get",
    holidaysControllers.getHoliday
  );
packageRouter.post(
    "/getall",
    holidaysControllers.getAllHolidays
  );
packageRouter.post(
    "/add",
    holidaysControllers.addHoliday
  );
packageRouter.post(
    "/update",
    holidaysControllers.updateHoliday
  );
packageRouter.post(
    "/delete",
    holidaysControllers.deleteHoliday
  );
packageRouter.post(
    "/getlist",
    holidaysControllers.getHolidayList 
  );

  module.exports = packageRouter;