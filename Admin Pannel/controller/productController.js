const Product = require("../model/productModel")

const getproducts=async(req,res)=>{
    try{
let products=await Product.find()
res.status(200).send(products)
    }
    catch(error){
        res.status(500).send({message:"Error retrieving products",error})
    }
}

const getProductByUserId=async(req,res)=>{
    try{
        const{userId}=req.cookies;
    let products=await Product.find({userId:userId})
    res.status(200).send(products)
    }
    catch(error){
        res.status(500).send({message:"Error retrieving products by user",error})
    }
}

const createProduct=async(req,res)=>{
    try{
    const{userId}=req.cookies;
    const{title,price,image}=req.body;
    let newproduct={
        title:title,
        price:price,
        image:image,
        userId:userId,
    }
    let product=await Product.create(newproduct)
    res.status(201).send(product)
    }
    catch(error){
        res.status(500).send({message:"Error creating product",error})
    }
}

const getProductsPage=async(req,res)=>{
    res.render("productForm")
}

module.exports={getproducts,getProductByUserId,createProduct,getProductsPage};