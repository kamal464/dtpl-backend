const baseRouter = require("express").Router();
// const schemaTableRouter = require("./schemaTable");
const addressRouter = require("./addressRoute");
const authRouter = require("./authRoute");
const countryRouter= require("./countryRoute");
const departmentRouter = require("./departmentRoute");
const empRouter = require("./empRoute");
const empcontactRouter = require("./empcontactRoute");
const empdependentRouter = require("./empdependentRoute");
const empeducationRouter = require("./empeducationRoute");
const emphistoryRouter = require("./emphistoryRoute");
const empofficialRouter = require("./empofficialRoute");
const emppersonalRouter = require("./emppersonalRoute");
const empprofileRouter = require("./empprofileRoute");
const empresignRouter = require("./empresignRoute");
const empsalaryRouter = require("./empsalaryRoute");
const empworkhistoryRouter = require("./empworkhistoryRoute");
const identificationRouter = require("./identificationRoute");
const officeRouter = require("./officeRoute");
const orgRouter = require("./orgRoute");
const reasonRouter = require("./reasonRoute")
const reasonitemRouter = require("./reasonitemRoute")
const schemacolumnRouter = require("./schemacolumnRoute");
const schemacolumnattrRouter = require("./schemacolumnattrRoute");
const schematableRouter = require("./schematableRoute")
const schematableattrRouter = require("./schematableattrRoute");
const settingRouter = require("./settingRoute");
const webmenuRouter = require("./webmenuRoute");
const vfsRouter = require("./vfsRoute");
const attendancerulesRouter = require("./attendencerulesRoute");
const holidaysRouter = require("./holidaysRoute");
const utilsRouter = require("../utils/utilsRoute");


// baseRouter.use("/schematable", schemaTableRouter);
baseRouter.use("/address", addressRouter);
baseRouter.use("/auth",authRouter);
baseRouter.use("/country",countryRouter);
baseRouter.use("/department",departmentRouter);
baseRouter.use("/emp",empRouter);
baseRouter.use("/empcontact",empcontactRouter);
baseRouter.use("/empdependent",empdependentRouter);
baseRouter.use("/empeducation",empeducationRouter);
baseRouter.use("/emphistory",emphistoryRouter);
baseRouter.use("/empofficial",empofficialRouter);
baseRouter.use("/emppersonal",emppersonalRouter);
baseRouter.use("/empprofile",empprofileRouter);
baseRouter.use("/empresign",empresignRouter);
baseRouter.use("/empsalary",empsalaryRouter);
baseRouter.use("/empworkhistory",empworkhistoryRouter);
baseRouter.use("/identification",identificationRouter);
baseRouter.use("/office",officeRouter);
baseRouter.use("/org",orgRouter);
baseRouter.use("/reason",reasonRouter);
baseRouter.use("/reasonitem",reasonitemRouter);
baseRouter.use("/schemacolumn",schemacolumnRouter);
baseRouter.use("/schemacolumnattr",schemacolumnattrRouter);
baseRouter.use("/schematable",schematableRouter);
baseRouter.use("/schematableattr",schematableattrRouter);
baseRouter.use("/setting",settingRouter);
baseRouter.use("/webmenu",webmenuRouter);
baseRouter.use("/vfs",vfsRouter);
baseRouter.use("/attendencerules",attendancerulesRouter);
baseRouter.use("/holidays",holidaysRouter);
baseRouter.use("/utils",utilsRouter);


module.exports = baseRouter;
