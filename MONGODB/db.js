const mongoose = require('mongoose')
const dbconnect=async()=>{
    await mongoose.connect("mongodb+srv://dhruvghinaiya:dhruvNode@cluster0.90vue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Cluster 0 created");
    
}

module.exports=dbconnect