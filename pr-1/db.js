const mongoose = require('mongoose')
const dbconnect=async()=>{
    await mongoose.connect("mongodb+srv://dhruvghinaiya90:project1@cluster0.2iab0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Cluster 0 created");
    
}

module.exports=dbconnect