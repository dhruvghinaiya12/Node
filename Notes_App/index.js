const express=require("express");
const expresslayouts=require("express-ejs-layouts");
const db = require("./config/db");
const app=express();
const port=process.env.PORT || 4141

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

app.use(expresslayouts);
app.set("layout","./layouts/main")
app.set("view engine","ejs")

app.use("/",require("./server/routes/app"))

app.get("/",(req,res)=>{
    const locals={
        title:"nodejs",
        description:"free nodejs note app",
    }
    res.render("index", locals)
})

app.listen(port,()=>{
console.log("server running on port " + port);
db();
})