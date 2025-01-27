const jwt = require('jsonwebtoken');
require('dotenv').config();

const CheckToken = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    try {

        let DecodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = DecodedToken;
        console.log(DecodedToken);
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Only Admin can create Teacher or Student accounts" });
          }
           
     next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = CheckToken;
