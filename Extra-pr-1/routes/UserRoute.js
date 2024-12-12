const { Router } = require("express");
const { getSignupPage, getLoginPage, getUser, createUser, loginUser } = require("../controller/UserController");


const userRouter = Router();

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)
userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.post("/login",loginUser)




module.exports = userRouter;