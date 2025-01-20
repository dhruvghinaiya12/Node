const Exam = require("../model/ExamSchema")

exports.CreateExam=async(req,res)=>{
    let exam=await Exam.create(req.body)
    res.send(exam)
}

exports.GetExam=async(req,res)=>{
    let exam=await Exam.find()
    res.send(exam)
}

exports.UpdateExam=async(req,res)=>{
    let {examId}=req.params
    let exam=await Exam.findByIdAndUpdate(examId,req.body,{new:true})
    res.send(exam)
}

exports.DeleteExam=async(req,res)=>{
    let {examId}=req.params
    let exam=await Exam.findByIdAndDelete(examId)
    res.send(exam)
}