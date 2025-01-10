const bcrypt = require("bcrypt");
const jsonwebtoken=require("jsonwebtoken")
const User = require("../model/UserSchema");
 require("dotenv").config()

exports.CreateUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;


    const user = await User.create(req.body);
    try{
        let token=jsonwebtoken.sign({
            id:user.id,
            email:user.email,
            username:user.username,
        },
        process.env.SECRET_KEY
        
    )
    console.log(token, user);
    
    res.send({ user, token} );  
  }
    catch(err){
        res.status(500).json({ message: "Error generating token", error: err.message });
    }

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllUsers=async(req,res)=>{
  try{
    let user=await User.find()
    res.status(200).json(user)
  }
  catch(error){
    res.status(500).json({ message: "Error retrieving users", error: error.message })
  }
}

exports.Login=async(req,res)=>{
  try{
    let {email,password}=req.body
    let user=await User.findOne({email:email})
    if(!user){
      return res.status(400).json({message:"User not found"})
    }
    let isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message:"Incorrect Password"})
    }
    let token=jsonwebtoken.sign({
      id:user.id,
      email:user.email,
      username:user.username,
    },
    process.env.SECRET_KEY
        
    )    
    res.send({ user, token} );  
  }
    catch(err){
        res.status(500).json({ message: "Error generating token", error: err.message });
    }
}