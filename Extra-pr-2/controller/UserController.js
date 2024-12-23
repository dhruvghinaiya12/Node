const bcrypt = require('bcrypt');
const User = require('../model/UserModel');


const createUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let Exist = await User.findOne({ email: email });
        if (Exist) {
            return res.send({ message: "User already exists" });
        } else {
            let hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            let user = await User.create(req.body);
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};


const getSignupPage=(req,res)=>{
    res.render("signup")
}

const getLoginPage=(req,res)=>{
    res.render("login")
}

module.exports={createUser,getLoginPage,getSignupPage}