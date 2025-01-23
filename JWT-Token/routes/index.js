const {Router}=require("express");
const UserRoutes = require("./UserRoute");
const FoodRoutes = require("./FoodRoute");
const OrderRoutes = require("./OrderRoute");


const app=Router();

app.use("/users",UserRoutes)
app.use("/food",FoodRoutes)
app.use("/order",OrderRoutes)


module.exports=app;