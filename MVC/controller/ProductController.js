const Product = require("../model/ProductModel")

// create a new product
const CreateProduct=async(req,res)=>{
    console.log("request",req.file);
    
    try {
        let data =await Product.create(req.body)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

// get all products
const GetProduct=async(req,res)=>{
    try {
        let data = await Product.find()
        res.status(200).send(data) 
    } catch (error) {
        res.status(500).send({ message: "Error retrieving products", error: error.message })
    }
}

// find all products by id
const GetProductById=async(req,res)=>{
    try {
        let {productId}=req.params
        let data=await Product.find({productId})
        res.status(200).send(data) 
    } catch (error) {
        res.status(500).send({ message: "Error retrieving product by ID", error: error.message })
    }
}

// update a product by id
const UpdateProduct=async(req,res)=>{
    try {
        let {productId}=req.params
        let data=await Product.findByIdAndUpdate(productId,req.body,{new:true})
        res.status(200).send(data) 
    } catch (error) {
        res.status(500).send({ message: "Error updating product by ID", error: error.message })
    }
}

// delete a product by id
const DeleteProduct=async(req,res)=>{
    try {
        let {productId}=req.params
        let data=await Product.findByIdAndDelete(productId)
        res.status(200).send(data) 
    } catch (error) {
        res.status(500).send({ message: "Error deleting product by ID", error: error.message })
    }
}

module.exports={CreateProduct,GetProduct,GetProductById,DeleteProduct,UpdateProduct}