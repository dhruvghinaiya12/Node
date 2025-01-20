const Food = require("../model/FoodSchema")

exports.CreateFood=async(req,res)=>{
    let food=await Food.create(req.body)
    res.send(food)
}

exports.GetFoodById=async(req,res)=>{
    let {foodId}=req.params
    let food=await Food.findById(foodId)
    res.send(food)
}

exports.GetAllFood=async(req,res)=>{
    let food=await Food.find()
    res.send(food)
}

exports.UpdateFoodById=async(req,res)=>{
    let {foodId}=req.params
    let food=await Food.findByIdAndUpdate(foodId,req.body,{new:true})
    res.send(food)
}

exports.DeleteFoodById=async(req,res)=>{
    let {foodId}=req.params
    let food=await Food.findByIdAndDelete(foodId)
    res.send(food)
}

exports.GetAllFoodByUserId=async(req,res)=>{
    let {userId}=req.params
    let food=await Food.find({userId:userId})
    res.send(food)
}