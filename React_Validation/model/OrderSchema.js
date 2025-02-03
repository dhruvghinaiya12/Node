const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    productName: String,
    quantity: Number,
    price: Number,
    deliveryDate: Date,
    email: String,
  });
  

const Order=mongoose.model("Order", orderSchema)

module.exports=Order