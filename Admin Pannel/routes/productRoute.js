const {Router}=require("express");
const { getproducts, getProductByUserId, createProduct, getProductsPage } = require("../controller/productController");
const IsLogin = require("../middleware/CheckLogin");
const productRouter=Router()

productRouter.get("/addProduct",IsLogin,getProductsPage)
productRouter.get("/",getproducts);
productRouter.get("/USERID",IsLogin,getProductByUserId);
productRouter.post("/",IsLogin,createProduct)

module.exports=productRouter;