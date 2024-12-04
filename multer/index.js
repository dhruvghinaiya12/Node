const express = require('express');
const app=express();
const path = require('path');
const upload = require('./utils/imageUpload');

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"view/index.html"))
})

app.post("/", upload.single("img"),(req,res)=>{
console.log(req.file);
res.send("image uploaded")
})

app.listen(5000,()=>{
    console.log("Server running at http://localhost:5000");
})