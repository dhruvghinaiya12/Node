const {Router}=require('express');
const { getFood, addFood, updateFood, getFoodPage } = require('../controller/FoodController');
const foodRouter=Router()   

foodRouter.get("/",getFood)
foodRouter.post("/",addFood)
foodRouter.patch("/:id",updateFood)
foodRouter.get("/addfood",getFoodPage)

module.exports=foodRouter;