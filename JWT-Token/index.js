const express=require("express");
const db = require("./config/db");
const UserRoutes=require("./routes/UserRoute")
require("dotenv").config();

const port=process.env.PORT || 5050
const app=express()
app.use(express.json())


app.get("/", (req, res) =>{
    res.send("Welcome to the API")
})

app.use("/api/v1/users", UserRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
   db()
})