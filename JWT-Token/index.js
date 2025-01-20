const express=require("express");
const cors=require("cors");
const db = require("./config/db");
const ApiRoutes=require("./routes/index");
const CheckToken = require("./middleware/CheckToken");
require("dotenv").config();

const port=process.env.PORT || 5050
const app=express()

app.use(
    cors({
      origin: "http://localhost:5173", 
    })
  );
app.use(express.json())


app.get("/", (req, res) =>{
    res.send("Welcome to the API")
})

app.use("/api/v1/",CheckToken,ApiRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
   db()
})