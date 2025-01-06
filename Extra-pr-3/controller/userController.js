const User = require("../model/UserSchema");
const sendEmail = require("../services/Mail");


const createUser = async (req, res) => {
    try {
       let user=await User.create(req.body)
       res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        let {email, password}=req.body
        let user=await User.findOne({email})
        if(!user) {
            return res.send({message:"User not found"})
        }
        if(user.password!=password) {
            return res.send({message:"Incorrect password"})
        }
        
        res.json({message:"Logged in successfully"})
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}


const getSignupPage=(req,res)=>{
    res.render("signup")
}

const getLoginPage=(req,res)=>{
    res.render("login")
}


const sendMail=async(req,res)=>{
    const{to,subject,content}=req.body
    await sendEmail(to,subject,content);
    res.send({message:"Email sent successfully " + to})
}

let otps=new Map()

const sendOTP=async(req,res)=>{
    const{email}=req.body
    console.log(req.body,email);
    
    let isExist=await User.findOne({email:email});
    if(!isExist){
        return res.send({message:"User not found"})
    }
    let otp=Math.round(1000 + Math.random() * 8999);
    otps.set(otp,email)
    let html=`<h1>OTP:${otp}</h1>`
    await sendEmail(email,"OTP Verification",html);
    res.send("otp sent successfully");
}

const CheckOtp=async(req,res)=>{
    let {otp,password}=req.body
    let data=otps.get(Number(otp))
    if(!data){
        return res.send({message:"Invalid OTP"})
    }
    let user=await User.findOne({email:data})
    user.password=password
    
    await user.save()
    // res.send("password reset successfully")
    res.redirect("/user/login")
    }


module.exports={createUser,getLoginPage,getSignupPage,loginUser,sendMail,sendOTP,CheckOtp}