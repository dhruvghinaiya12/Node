const mongoose = require('mongoose');

const db=async()=>{
    await mongoose.connect("mongodb://localhost:27017/recipes")
    console.log("Connect to database");  
}

module.exports=db;