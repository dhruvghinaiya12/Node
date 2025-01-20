const Result = require("../model/ResultSchema")

exports.getResult=async(req,res)=>{
    let result=await Result.find()
    res.send(result)
}