const { Router } = require("express");
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getSignupPage,
  getLoginPage,
  loginUser,
} = require("../controller/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get("/signup",getSignupPage)
userRouter.get("/login",getLoginPage)
userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.get("/:userId", getUserById);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/login",passport.authenticate("local"),(req,res)=>{
  res.send("login success")
})


module.exports = userRouter;
