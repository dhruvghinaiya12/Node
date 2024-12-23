const { Router } = require("express");

const passport = require("passport");
const { getSignupPage, getLoginPage, createUser } = require("../controller/UserController");

const userRouter = Router();

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)

userRouter.post("/", createUser);

userRouter.post("/login",passport.authenticate("local"),(req,res)=>{
    // res.send("login success")
    res.redirect("/")
  })
  

module.exports = userRouter;
