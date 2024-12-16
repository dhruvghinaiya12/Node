const Food = require("../model/FoodModel")

const getFood=async(req,res)=>{
    try{
        let food=await Food.findById()

        res.status(200).send(food)

    }
    catch(error){
        res.status(500).send({message:"Error retrieving food",error})
    }
}

const addFood=async(req,res)=>{
let {role,id}=req.cookies
        if(role!=="admin"){
            return res.send({message:"Unauthorized"})
        }
        try{
            let food=await Food.create(req.body)
            res.status(201).send(food)
    }
     catch(error){
            res.status(500).send({message:"Error adding food",error})
        }
}

const updateFood=async(req,res)=>{
    try{
        let{id}=req.params
        let food=await Food.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send(food)
    }
    catch(error){
        res.status(500).send({message:"Error updating food",error})
    }
}

const getFoodPage=(req,res)=>{
    res.render("AddFood")
}

module.exports={getFood,addFood,updateFood,getFoodPage}