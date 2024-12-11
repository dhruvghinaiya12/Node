const User = require("../model/userModel")

const createUser=async(req,res)=>{
    try {
        let {email}=req.body
        let Exist = await User.findOne({ email: email });
        if(Exist){
            return res.send({ message: "User already exists" });
        }
        else{
            let user=await User.create(req.body)
            res.status(201).json(user)
        } 
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message })
    }
}

const getUser=async(req,res)=>{
    try{
        let user=await User.find()
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving users", error: error.message })
    }
}

const getUserById=async(req,res)=>{
    try{
        let {userId}=req.params
        let user=await User.findById(userId)
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving user", error: error.message })
    }
}

const updateUser=async(req,res)=>{
    try{
        let {userId}=req.params
        let user=await User.findByIdAndUpdate(userId,req.body,{new:true})
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({ message: "Error updating user", error: error.message })
    }
}

const deleteUser=async(req,res)=>{
    try{
        let {userId}=req.params
        let user=await User.findByIdAndDelete(userId)
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({ message: "Error deleting user", error: error.message })
    }
}

const loginUser=async(req,res)=>{
    try{
let {email,password}=req.body
let Exist=await User.findOne({email:email})
if(!Exist){
    return res.send({message:"User not found"})
}

if(Exist.password!==password){
    return res.send({message:"Incorrect password"})
}
res.cookie("username",Exist.username)
res.cookie("userId",Exist.id)
// res.send({message:"User logged in successfully"})
res.redirect("http://localhost:5000/")
    }
    catch(error){
        res.status(500).json({ message: "Error logging in user", error: error.message })
    }
}

const getSignupPage=(req,res)=>{
    res.render("signup")
}

const getLoginPage=(req,res)=>{
    res.render("login",{
        title:"Login",
    })
}

module.exports={createUser,getUser,getUserById,updateUser,deleteUser,getSignupPage,getLoginPage,loginUser}