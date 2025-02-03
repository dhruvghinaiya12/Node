const {Router}=require("express")
const OrderController=require("../controller/OrderController")

const OrderRoutes=Router()

OrderRoutes.post("/", OrderController.Order)
OrderRoutes.get("/",OrderController.GetAllorders)

module.exports = OrderRoutes