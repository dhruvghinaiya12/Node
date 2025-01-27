const {Router}=require("express")
const UserController=require ("../controller/UserController");
const CheckToken = require("../middleware/Auth");

const UserRoutes=Router();

UserRoutes.post("/Signup",CheckToken,UserController.CreateUser)
UserRoutes.post("/Login",UserController.Login)

module.exports=UserRoutes;