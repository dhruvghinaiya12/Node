const mongoose = require('mongoose');
const User = require('./UserSchema');
const Exam = require('./ExamSchema');

 const ResultSchema=new mongoose.Schema({

   Exam:{type:mongoose.Schema.Types.ObjectId,ref:Exam},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:User},
 })
 
 const Result=mongoose.model('Result',ResultSchema)

 module.exports=Result;
 
