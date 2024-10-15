const express = require("express");
const dbconnect = require("./db");
const Task = require("./TaskModel");
const validateTask = require("./validate");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())

// GET Route
app.get("/", async (req, res) => {
  let data=await Task.find()
  res.send(data);
});

// POST Route
app.post("/",validateTask, async (req, res) => {
  let data=await Task.create(req.body);
  res.send(data);
})

// patch Route
app.patch("/:id",validateTask,async(req,res)=>{
  let {id}=req.params;
  let data=await Task.findByIdAndUpdate(id,req.body,{new:true});
  res.send(data);
})

// delete Route

app.delete("/:id",async(req,res)=>{
  let {id}=req.params
  let data=await Task.findByIdAndDelete(id)
  res.send(data)
})
app.listen(4042, () => {
  console.log(`App running at http://localhost:4042`);
  // Connect to MongoDB database
 dbconnect()
});