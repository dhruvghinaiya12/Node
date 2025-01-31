const {Router}=require("express")
const usercontroller=require("../controller/UserController")
const UserRoutes=Router();

UserRoutes.post("/signup",usercontroller.SignUp)

UserRoutes.post("/login",usercontroller.Login)

UserRoutes.get("/info/:id",usercontroller.GetUserById)

UserRoutes.get("/Alluser",usercontroller.GetAllUsers)

UserRoutes.patch("/:id",usercontroller.Update)

UserRoutes.delete("/:id",usercontroller.Delete)

UserRoutes.get("/",usercontroller.UsersByQuery)




module.exports=UserRoutes;