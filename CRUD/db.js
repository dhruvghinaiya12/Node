const mongoose = require('mongoose')
const dbconnect=async()=>{
    await mongoose.connect("mongodb://localhost:27017/db")
    console.log("connect to mongodb");
    
}

module.exports=dbconnect