const {Router}=require("express");
const { getSignUpPage, SignUpUser, getLoginPage, loginUser, deleteUser } = require("../controller/UserController");

const UserRouter=Router();

UserRouter.get("/signup",getSignUpPage)
UserRouter.get("/Login",getLoginPage)
UserRouter.post("/signup",SignUpUser)
UserRouter.post("/login",loginUser)
UserRouter.delete("/users/:id", deleteUser);

module.exports=UserRouter;