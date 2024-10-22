const { Router } = require("express");
const {
  GetProduct,
  CreateProduct,
  GetProductById,
} = require("../controller/ProductController");
const ProductRouter = Router();

ProductRouter.get("/", GetProduct);
ProductRouter.post("/", CreateProduct);
ProductRouter.get("/user/:userId", GetProductById);


module.exports=ProductRouter;