const {Router}=require("express")
const FoodController=require("../controller/FoodController")

const FoodRoutes=Router();

FoodRoutes.post("/create",FoodController.CreateFood)
FoodRoutes.get("/",FoodController.GetAllFood)
FoodRoutes.get("/:foodId",FoodController.GetFoodById)
FoodRoutes.patch("/:foodId",FoodController.UpdateFoodById)
FoodRoutes.delete("/:foodId",FoodController.DeleteFoodById)
FoodRoutes.get("/user/:userId",FoodController.GetAllFoodByUserId)

module.exports=FoodRoutes;