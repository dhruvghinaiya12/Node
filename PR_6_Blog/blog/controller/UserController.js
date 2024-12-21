const User = require("../model/UserSchema");

const getSignUpPage=(req,res)=>{
    res.render("SignUp")
}

const getLoginPage=(req,res)=>{
    res.render("Login")
}

const SignUpUser=async(req,res)=>{
    try {
        const user = await User.create(req.body);
        // console.log(req.body,user);
        
        res.cookie("role", user.role);
        res.cookie("id", user.id);
        res.cookie("username", user.username);

        res.send(`Account created successfully ${user.username}`);
    } catch (error) {
        res.status(500).send("An error occurred while processing your request.");
    }
}

const loginUser=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const Exist = await User.findOne({ email });
        console.log(Exist);
        
        if (!Exist) {
            return res.status(401).send('Invalid Credentials.');
        }
        if(Exist.password!=password) {
            return res.status(401).send('Invalid Credentials.');
        }
        res.cookie("role", Exist.role);
        res.cookie("id", Exist.id);
        res.cookie("username", Exist.username);
        console.log("Cookies set in response:", res.getHeaders());
        res.send(`Welcome User ${Exist.username}`);
        
    }
     catch (error) {
        res.status(500).send("An error occurred while processing your request.");
     } 
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        await User.findByIdAndDelete(id);

        res.send(`User deleted ${user.username}`);
    } catch (error) {
        res.status(500).send("An error occurred while processing your request.");
    }
};



module.exports={getSignUpPage,SignUpUser,getLoginPage,loginUser,deleteUser}