const Order = require("../model/OrderSchema");

exports.CreateOrder=async(req,res)=>{
let user=req.user.id;
let {foods}=req.body;
let order=await Order.create({foods:foods,user:user});
res.send(order)
}

exports.GetOrderByUserId=async(req,res)=>{
    let user=req.user.id;
    let orders=await Order.find({user:user}).populate("foods")
    console.log(orders);
    
    res.send(orders)
}