const {Router}=require("express")
const UserController=require ("../controller/UserController");
const CheckToken = require("../middleware/CheckToken");

const Routes=Router();

Routes.post("/Signup",UserController.CreateUser)
Routes.get("/AllUsers",CheckToken,UserController.getAllUsers)
Routes.post("/Login",UserController.Login)

module.exports=Routes;