const Cart = require("../model/CartModel");

const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId }) || { userId, items: [] };

        cart.items.push({ productId, quantity: 0 });

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart.", error: error.message,
        });
    }
};

module.exports = addToCart;
