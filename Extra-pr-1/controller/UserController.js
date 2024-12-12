const User = require("../model/UserModel")

const createUser=async(req,res)=>{
    if (req.file) {
        req.body.img = `uploads/${req.file.filename}`; 
    }  
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
res.cookie("email",Exist.email)
 res.cookie("img",Exist.img)
 res.cookie("userId",Exist.id)
// res.send({message:"User logged in successfully"})
res.redirect("/")


    }
    catch(error){
        res.status(500).json({ message: "Error logging in user", error: error.message })
    }
}

const getSignupPage=(req,res)=>{
    res.render("signup")
}

const getLoginPage=(req,res)=>{
    res.render("login")
}

module.exports ={getSignupPage,getLoginPage,createUser,getUser,loginUser}