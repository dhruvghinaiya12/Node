const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    number:String,
    gender:String,
    email:String,
    password:String,
})

const User=mongoose.model("User",userSchema)

module.exports=User