const packageRouter = require("express").Router();
const empeducationController = require("../controllers/empeducationApi");


packageRouter.post(
    "/get",
    empeducationController.getEmpeducation
  );
packageRouter.post(
    "/getall",
    empeducationController.getAllEmpeducation
  );
packageRouter.post(
    "/add",
    empeducationController.addEmpeducation
  );
packageRouter.post(
    "/update",
    empeducationController.updateEmpeducation
  );
packageRouter.post(
    "/delete",
    empeducationController.deleteEmpeducation
  );
packageRouter.post(
    "/getlist",
    empeducationController.getEmpeducationList 
  );

  module.exports = packageRouter;