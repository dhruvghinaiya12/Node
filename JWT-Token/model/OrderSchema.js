const mongoose=require("mongoose");
const User = require("./UserSchema");
const Food = require("./FoodSchema");


const orderSchema=new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref:User,require:true},
foods:[{type:mongoose.Schema.Types.ObjectId,ref:Food,require:true}]
})

const Order=mongoose.model("Order",orderSchema)

module.exports=Order