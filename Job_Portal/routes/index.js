const {Router}=require("express")
const UserRoutes=require("./UserRoute");
const UserDetailsRoutes = require("./UserDetailsRoute");
const CompanyRoutes = require("./CompanyRoute");
const Routes=Router();

Routes.use("/user",UserRoutes)
Routes.use("/user-details",UserDetailsRoutes)
Routes.use("/companies",CompanyRoutes)

module.exports=Routes;