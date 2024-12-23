const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId:String, 
    items: [
        {
            productId: string,
            quantity: { type: Number, default: 0 },
        },
    ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
