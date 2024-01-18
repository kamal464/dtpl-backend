const packageRouter = require("express").Router();
const projectsController = require("../controllers/projectsApi");


packageRouter.post(
    "/get",
    projectsController.getProject
  );
packageRouter.post(
    "/getall",
    projectsController.getAllProjects
  );
packageRouter.post(
    "/add",
    projectsController.addProject
  );
packageRouter.post(
    "/update",
    projectsController.updateProject
  );
packageRouter.post(
    "/delete",
    projectsController.deleteProject
  );
packageRouter.post(
    "/getlist",
    projectsController.getListProjects 
  );

  module.exports = packageRouter;