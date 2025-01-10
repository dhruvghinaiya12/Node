
const jwt = require('jsonwebtoken');

require('dotenv').config();

const CheckToken=async(req,res,next)=>{
    let token=req.headers.authorization?.split(' ')[1]
    console.log(req.headers.authorization);
    
    if(!token){
        return res.status(401).json({message:"Token is required"})
    }
    try {
        let DecodedToken=await jwt.verify(token,process.env.SECRET_KEY)
        console.log(DecodedToken);
        next();  
    } catch (error) {
        return res.status(401).json({message:"Invalid token"})
    }
}

module.exports = CheckToken;
