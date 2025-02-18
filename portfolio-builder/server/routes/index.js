const {Router}=require("express")
const UserRoutes=require("./UserRoute");
const PortfolioRoutes=require("./PortfolioRoute");


const Routes=Router();

Routes.use("/user",UserRoutes)
Routes.use("/portfolio",PortfolioRoutes)



module.exports=Routes;