const {Router}=require("express");
const UserRoutes = require("./UserRoute");
const FoodRoutes = require("./FoodRoute");


const app=Router();

app.use("/users",UserRoutes)
app.use("/food",FoodRoutes)


module.exports=app;