const User = require("../model/UserModel");

const getUser = async (req, res) => {
  let data = await User.find();
  res.send(data);
};

const postUser = async (req, res) => {
  let { email, name, password } = req.body;
  let Exist = await User.findOne({ email });

  if (Exist) {
    console.log(Exist);

    return res.send({ message: "User already exists" });
  } 
  
  else {
    let data = await User.create(req.body);
    res.send(data);
  }
};

const Login = async (req, res) => {
    console.log("Login route hit");
    let { email, password } = req.body;
    console.log("Request body:", req.body);
  
    let Exist = await User.findOne({ email });
   
    console.log("User found:", Exist);
  
    if (!Exist) {
      return res.send({ message: "User not found" });
    }
    if (Exist.password != password) {
      return res.send({ message: "Incorrect password" });
    }
    res.send({ message: "Login successful", user: Exist });
  };
  

module.exports = { getUser, postUser, Login};
