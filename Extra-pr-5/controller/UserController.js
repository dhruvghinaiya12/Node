const bcrypt = require("bcrypt");
const jsonwebtoken=require("jsonwebtoken");
const User = require("../model/UserSchema");
 require("dotenv").config()

 exports.CreateUser = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    if (role !== 'Admin') {
      return res.status(403).json({ message: "Only Admin can create users" });
    }

    let UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    try {
      let token = jsonwebtoken.sign({
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        process.env.SECRET_KEY
      );
      console.log(token, user);
      
      res.send({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }

  } catch (error) {
    return res.status(500).json(error);
  }
};

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
      role:user.role,
    },
    process.env.SECRET_KEY   
    )   
    // console.log(token, user);
 
    res.send({ user, token} );  

  }
    catch(err){
        res.status(500).json(err);
    }
}