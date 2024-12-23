const {Router} = require("express");
const addToCart = require("../controller/CartController");
const IsLogin = require("../middleware/CheckLogin");
const CartRouter = Router();

CartRouter.patch("/cart/:productId",IsLogin,addToCart);

module.exports = CartRouter;
