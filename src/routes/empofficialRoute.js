const packageRouter = require("express").Router();
const empofficialController = require("../controllers/empofficialApi");


packageRouter.post(
    "/get",
    empofficialController.getEmpofficial
  );
packageRouter.post(
    "/getall",
    empofficialController.getAllEmpofficials
  );
packageRouter.post(
    "/add",
    empofficialController.addEmpofficial
  );
packageRouter.post(
    "/update",
    empofficialController.updateEmpofficial
  );
packageRouter.post(
    "/delete",
    empofficialController.deleteEmpofficial
  );
packageRouter.post(
    "/getlist",
    empofficialController.getEmpofficialList 
  );

  module.exports = packageRouter;