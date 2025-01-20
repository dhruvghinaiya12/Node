const QueAns = require("../model/QuestionSchema")

exports.CreateQustion=async(req,res)=>{
    let question=await QueAns.create(req.body)
    res.send(question)
}
exports.updateQustion=async(req,res)=>{
    let {questionId}=req.params
    let question=await QueAns.findByIdAndUpdate(questionId,req.body,{new:true})
    res.send(question)
}

exports.deleteQustion=async(req,res)=>{
    let {questionId}=req.params
    let question=await QueAns.findByIdAndDelete(questionId)
    res.send(question)
}

exports.getAllQuestion=async(req,res)=>{
    let question=await QueAns.find()
    res.send(question)
}