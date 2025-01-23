const mongoose=require("mongoose")
const User = require("./UserSchema")

const foodSchema=new mongoose.Schema({
 title:String,
 price:Number,
 img:String,
 category:String,
 UserId:{type:mongoose.Schema.Types.ObjectId,ref:User ,required:true}

})

const Food=mongoose.model("Food",foodSchema)

module.exports=Food