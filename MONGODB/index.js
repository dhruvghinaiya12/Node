const express = require("express");
const dbconnect = require("./db");
const User = require("./usermodel");
const valid = require("./validate");
const app = express();

app.use(express.json())

// GET Route
app.get("/", async (req, res) => {
  let data=await User.find()
  res.send(data);
});

// POST Route
app.post("/",valid, async (req, res) => {
  let data=await User.create(req.body);
  res.send(data);
})

// patch Route
app.patch("/:id",async(req,res)=>{
  let {id}=req.params;
  let data=await User.findByIdAndUpdate(id,req.body,{new:true});
  res.send(data);
})

// delete Route

app.delete("/:id",async(req,res)=>{
  let {id}=req.params
  let data=await User.findByIdAndDelete(id)
  res.send(data)
})
app.listen(4041, () => {
  console.log(`App running at http://localhost:4041`);
  // Connect to MongoDB database
  dbconnect()
});