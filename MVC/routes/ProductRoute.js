const { Router } = require("express");
const {
  GetProduct,
  CreateProduct,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
} = require("../controller/ProductController");
const ProductRouter = Router();

ProductRouter.get("/", GetProduct);
ProductRouter.post("/", CreateProduct);
ProductRouter.get("/:productId", GetProductById);
ProductRouter.patch("/:productId", UpdateProduct)
ProductRouter.delete("/:productId", DeleteProduct);


module.exports=ProductRouter;