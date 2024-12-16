const {Router}=require('express');
const { getLoginPage, getSignupPage, getAllUsers, createuser, loginUser } = require('../controller/UserController');
const userRouter=Router()   

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)
userRouter.get("/",getAllUsers)
userRouter.post("/",createuser)
userRouter.post("/login",loginUser)

module.exports=userRouter;