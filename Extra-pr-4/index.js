const express=require("express");
const cors=require("cors");
const db = require("./config/db");
const UserRoutes = require("./routes/UserRoute");
const QueAnsRoutes = require("./routes/QueAnsRoute");
const ExamRoutes = require("./routes/ExamRoute");
const ResultRoutes = require("./routes/ResultRoute");
require("dotenv").config();

const port=process.env.PORT || 5050
const app=express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    
}))

app.get("/", (req, res) =>{
    res.send("Welcome to the API")
})

app.use("/api/v1/user",UserRoutes )
app.use("/api/v1/question",QueAnsRoutes)
app.use("/api/v1/exam",ExamRoutes)
app.use("/api/v1/result",ResultRoutes)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
   db()
})