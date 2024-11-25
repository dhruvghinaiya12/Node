const express = require("express");
const dbconnect = require("./db");
const Student = require("./studentmodel");

const app = express();

app.use(express.json())

// GET Route
app.get("/students", async (req, res) => {
  let data=await Student.find()
  res.send(data);
});

// GET Route by ID
app.get("/students/:id", async (req, res) =>{
  let {id}=req.params
  let data=await Student.findById(id)
  res.send(data)
})

// POST Route
app.post("/student", async (req, res) => {
  let data=await Student.create(req.body);
  res.send(data);
})

// patch Route
app.patch("/student/:id",async(req,res)=>{
  let {id}=req.params;
  let data=await Student.findByIdAndUpdate(id,req.body,{new:true});
  res.send(data);
})

// delete Route

app.delete("/students/:id",async(req,res)=>{
  let {id}=req.params
  let data=await Student.findByIdAndDelete(id)
  res.send(data)
})
app.listen(4041, () => {
  console.log(`App running at http://localhost:4041`);
  dbconnect()
});