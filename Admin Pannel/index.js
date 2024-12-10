const express = require("express");
const cookieParser = require('cookie-parser')

const path = require("path");
const db = require("./config/db");
const userRouter = require("./routes/userRoute");
const IsLogin = require("./middleware/CheckLogin");

const app = express();
const port = process.env.PORT || 5050;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


app.get("/",IsLogin,(req,res)=>{
  let {username}=req.cookies
  res.render("index", {username});
})
app.use("/user",userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
