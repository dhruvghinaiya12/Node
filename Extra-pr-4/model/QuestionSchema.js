const mongoose = require('mongoose');

 const QueAnsSchema=new mongoose.Schema({
    question: String,
    answer: String,
 })
 
 const QueAns=mongoose.model('QueAns',QueAnsSchema)
 
 module.exports=QueAns;
