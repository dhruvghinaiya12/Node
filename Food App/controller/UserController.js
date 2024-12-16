const User = require("../model/UserModel")

const createuser=async(req,res)=>{
    try{
        let {email}=req.body
        let Exist=await User.findOne({email:email})
        if(Exist){
            return res.send({message:"User already exists"})
        }
        else{
            let user=await User.create(req.body)
            res.status(201).json(user)
        }
    }
    catch(error){
        res.status(500).json({message:"Error creating user",error:error.message})
    }
}

const loginUser=async(req,res)=>{
    try{
        let {email,password}=req.body
        let Exist=await User.findOne({email:email})
        if(!Exist){
            return res.status(401).json({message:"Email does not exist"})
        }
       if(Exist.password!=password){
        return res.status(401).json({message:"Incorrect password"})
   
    }
    res.cookie("username",Exist.username)
    res.cookie("userId",Exist.id)
    res.cookie("role",Exist.role)
    res.send({message:"Logged in successfully"})
}
    catch(error){
        res.status(500).json({message:"Error logging in user",error:error.message})
    }
}

const getAllUsers=async(req,res)=>{
    try{
        let users=await User.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({message:"Error retrieving users",error:error.message})
    }
}

const getSignupPage=(req,res)=>{
    res.render("signup")
}

const getLoginPage=(req,res)=>{
    res.render("login")
}

module.exports={getLoginPage,getSignupPage,createuser,loginUser,getAllUsers}