const {Router}=require("express")
const OrderContoller=require("../controller/OrderController")
const OrderRoutes=Router();

OrderRoutes.post("/",OrderContoller.CreateOrder)
OrderRoutes.get("/",OrderContoller.GetOrderByUserId)

module.exports=OrderRoutes;


