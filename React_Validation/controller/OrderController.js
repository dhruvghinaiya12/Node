const Order = require("../model/OrderSchema")

exports.Order=async(req,res)=>{
    let order=await Order.create(req.body)
    res.status(201).json(order)
}

exports.GetAllorders=async(req,res)=>{
    let orders=await Order.find()
    res.json(orders)
}

