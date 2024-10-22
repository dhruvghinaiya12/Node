const { Router } = require("express");
const { getUser, postUser, Login } = require("../controller/UserController");
const userRouter = Router()

userRouter.get("/", getUser);

userRouter.post("/", postUser);

userRouter.post("/login", Login);

module.exports = userRouter;
