const { Router } = require("express");
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getSignupPage,
  getLoginPage,
  getAdmins,
  sendMail,
  sendOTP,
} = require("../controller/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)
userRouter.get("/Admin",getAdmins)

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.get("/:userId", getUserById);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/login",passport.authenticate("local"),(req,res)=>{
  // res.send("login success")
  res.redirect("/")
})
userRouter.post("/mail",sendMail)
userRouter.post("/sendotp",sendOTP)


module.exports = userRouter;
