const mongoose = require('mongoose');
const QueAns = require('./QuestionSchema');

 const QueAnsSchema=new mongoose.Schema({

   questionId:{type:mongoose.Schema.Types.ObjectId,ref:QueAns},
   Timeduration:Date.now(),

 })
 
 const Exam=mongoose.model('QueAns',QueAnsSchema)

 module.exports=Exam;
 
