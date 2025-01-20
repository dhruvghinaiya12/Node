const mongoose = require('mongoose');
const QueAns = require('./QuestionSchema');

 const ExamSchema=new mongoose.Schema({

   questionId:{type:mongoose.Schema.Types.ObjectId,ref:QueAns},
   title: String, 
   marks:Number,
   startingTime: String,
   endingTime: String,
 })
 
 const Exam=mongoose.model('Exam',ExamSchema)

 module.exports=Exam;
 
