const { Router } = require("express");
const { getSignupPage, getLoginPage, createUser, loginUser, sendMail, sendOTP, CheckOtp } = require("../controller/userController");



const userRouter = Router();

userRouter.get("/SendOtp", (req, res) => {
    res.render("SendOtp");
  });

  userRouter.get("/resetpassword", (req, res) => {
    res.render("ResetPassword");
  });
  

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser);
userRouter.post("/mail",sendMail)
userRouter.post("/sendotp",sendOTP)
userRouter.post("/resetpassword",CheckOtp)



  

module.exports = userRouter;
