const {Router}=require("express")
const UserController=require ("../controller/UserController");

const UserRoutes=Router();

UserRoutes.post("/Signup",UserController.CreateUser)
UserRoutes.post("/Login",UserController.Login)

module.exports=UserRoutes;