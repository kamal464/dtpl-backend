const baseRouter = require("express").Router();
const schemaTableRouter = require("./schemaTable");

baseRouter.use("/schematable", schemaTableRouter);

module.exports = baseRouter;
