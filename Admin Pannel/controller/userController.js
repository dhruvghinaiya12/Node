const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const sendEmail = require("../service/Mail");


const createUser=async(req,res)=>{
    try {
        let {email,password}=req.body
        let Exist = await User.findOne({ email: email });
        if(Exist){
            return res.send({ message: "User already exists" });
        }
        else{
            let hash=await bcrypt.hash(password,10)
            req.body.password=hash;
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

const checkPassword=await bcrypt.compare(password,Exist.password)

if(!checkPassword){
    return res.send({message:"Incorrect password"})
}

res.cookie("username",Exist.username)
res.cookie("userId",Exist.id)
// res.send({message:"User logged in successfully"})
res.redirect("/")
    }
    catch(error){
        res.status(500).json({ message: "Error logging in user", error: error.message })
    }
}

const getAdmins=async(req,res)=>{
    try{
        let admins=await User.find({role:"Admin",verified:false})
        res.status(200).send(admins)
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving admins", error: error.message })
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


// send mail

const sendMail=async(req,res)=>{
    const{to,subject,content}=req.body
    await sendEmail(to,subject,content);
    res.send({message:"Email sent successfully " + to})
}

// otp send mail

const sendOTP=async(req,res)=>{
    const{email}=req.body
    console.log(req.body,email);
    
    let isExist=await User.findOne({email:email});
    if(!isExist){
        return res.send({message:"User not found"})
    }
    let otp=Math.round(1000 + Math.random() * 8999);
    let html=`<h1>OTP:${otp}</h1>`
    await sendEmail(email,"OTP Verification",html);
    res.send("otp sent successfully");
}

module.exports={createUser,getUser,getUserById,updateUser,deleteUser,getSignupPage,getLoginPage,loginUser,getAdmins,sendMail,sendOTP}