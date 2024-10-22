const Product = require("../model/ProductModel")

const CreateProduct=async(req,res)=>{
    let data =await Product.create(req.body)
    res.send(data)
}

const GetProduct=async(req,res)=>{
    let data = await Product.find()
    res.send(data)
}

// find all products by id

const GetProductById=async(req,res)=>{
    let {userId}=req.params
    let data=await Product.find({userId})
    res.send(data)
}

module.exports={CreateProduct,GetProduct,GetProductById}